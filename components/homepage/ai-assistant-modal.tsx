"use client";

import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import type { CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mic, MicOff, ArrowUp, ChevronRight } from "lucide-react";
import { OrsRobotIcon } from "@/components/ui/ors-robot-icon";
import { useLenis } from "lenis/react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

interface AiAssistantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Message {
  id: number;
  type: "user" | "bot";
  content: string;
  isNew?: boolean;
}

/* Word-by-word typing animation component */
interface TypingTextProps {
  text: string;
  onComplete?: () => void;
  speed?: number;
}

function TypingText({ text, onComplete, speed = 25 }: TypingTextProps) {
  const [displayedWords, setDisplayedWords] = useState<number>(0);
  const words = text.split(/(\s+)/); // Split but keep whitespace

  useEffect(() => {
    if (displayedWords < words.length) {
      const timer = setTimeout(() => {
        setDisplayedWords((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [displayedWords, words.length, speed, onComplete]);

  const visibleText = words.slice(0, displayedWords).join("");
  return <>{formatBotMessage(visibleText)}</>;
}

/* Format bot message: links become clickable, titles become bold */
function formatBotMessage(content: string) {
  const lines = content.split("\n");
  
  // Function to parse and linkify text
  const linkifyText = (text: string, lineKey: string) => {
    const combinedPattern = /(https?:\/\/[^\s]+)|((?:[a-zA-Z0-9][a-zA-Z0-9-]*\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let partIndex = 0;
    
    while ((match = combinedPattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      
      const matchedText = match[0];
      
      if (match[1]) {
        parts.push(
          <a
            key={`${lineKey}-link-${partIndex}`}
            href={matchedText}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#226fd3] hover:text-[#1a5bb5] underline underline-offset-2 cursor-pointer transition-colors"
          >
            {matchedText}
          </a>
        );
      } else if (match[2]) {
        parts.push(
          <a
            key={`${lineKey}-domain-${partIndex}`}
            href={`https://${matchedText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#226fd3] hover:text-[#1a5bb5] underline underline-offset-2 cursor-pointer transition-colors"
          >
            {matchedText}
          </a>
        );
      } else if (match[3]) {
        parts.push(
          <a
            key={`${lineKey}-email-${partIndex}`}
            href={`mailto:${matchedText}`}
            className="text-[#226fd3] hover:text-[#1a5bb5] underline underline-offset-2 cursor-pointer transition-colors"
          >
            {matchedText}
          </a>
        );
      }
      
      lastIndex = match.index + matchedText.length;
      partIndex++;
    }
    
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    
    return parts.length > 0 ? parts : text;
  };
  
  return lines.map((line: string, index: number) => {
    const trimmedLine = line.trim();
    const isTitle = trimmedLine.endsWith(":") && trimmedLine.length < 60;
    const isBulletPoint = /^[-•*]\s/.test(trimmedLine);
    const isNumberedList = /^\d+[.)]\s/.test(trimmedLine);
    const labelMatch = trimmedLine.match(/^([^:]+):\s*(.+)$/);
    const isLabelValue = labelMatch && labelMatch[1].length < 30 && !trimmedLine.startsWith("http");
    
    if (!trimmedLine) {
      return <br key={index} />;
    }
    
    const lineKey = `line-${index}`;
    
    if (isTitle) {
      return (
        <span key={lineKey} className="block mt-3 first:mt-0">
          <strong className="font-semibold text-gray-900">{trimmedLine}</strong>
          {index < lines.length - 1 && <br />}
        </span>
      );
    }
    
    if (isLabelValue && labelMatch) {
      return (
        <span key={lineKey}>
          <strong className="font-medium text-gray-700">{labelMatch[1]}:</strong>{" "}
          <span>{linkifyText(labelMatch[2], lineKey)}</span>
          {index < lines.length - 1 && <br />}
        </span>
      );
    }
    
    if (isBulletPoint || isNumberedList) {
      return (
        <span key={lineKey} className="block pl-2">
          {linkifyText(trimmedLine, lineKey)}
          {index < lines.length - 1 && <br />}
        </span>
      );
    }
    
    return (
      <span key={lineKey}>
        {linkifyText(trimmedLine, lineKey)}
        {index < lines.length - 1 && <br />}
      </span>
    );
  });
}

function AiAssistantModalComponent({ open, onOpenChange }: AiAssistantModalProps) {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content: t.ai.initialBotMessage,
    },
  ]);

  // Update initial message if language changes
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 1) {
        return [{ ...prev[0], content: t.ai.initialBotMessage }];
      }
      return prev;
    });
  }, [language, t.ai.initialBotMessage]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.classList.add("no-scroll");
    document.documentElement.classList.add("no-scroll");
    return () => {
      lenis?.start();
      document.body.classList.remove("no-scroll");
      document.documentElement.classList.remove("no-scroll");
    };
  }, [open, lenis]);

  // Mobile back button closes the modal instead of navigating away
  useEffect(() => {
    if (!open) return;
    window.history.pushState({ aiModal: true }, "");
    const handlePopState = () => {
      onOpenChange(false);
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      // Clean up the history entry if modal was closed normally (not via back button)
      if (window.history.state?.aiModal) {
        window.history.back();
      }
    };
  }, [open, onOpenChange]);

  const messagesRef = useRef<Message[]>(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const id = window.setTimeout(() => {
      el.scrollTop = el.scrollHeight;
    }, 0);
    return () => clearTimeout(id);
  }, [messages]);

  const handleTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, []);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(t.ai.recording.notSupported);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language === 'en' ? 'en-US' : (language === 'fr' ? 'fr-FR' : 'es-ES');
    recognition.onstart = () => setIsRecording(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      if (textareaRef.current) {
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
          }
        }, 0);
      }
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    recognitionRef.current = recognition;
    recognition.start();
  }, [isRecording, language, t.ai.recording.notSupported]);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMessage: Message = { id: Date.now(), type: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setHasStartedChat(true);
    try {
      const conversationHistory = [...messagesRef.current, userMessage].map((m: Message) => ({ role: m.type, content: m.content }));
      const response = await fetch("/api/chat", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ messages: conversationHistory, language }) 
      });
      if (!response.ok) throw new Error("Failed to fetch response");
      const data = await response.json();
      if (data?.text) {
        setMessages((prev) => [...prev, { id: Date.now() + 1, type: "bot", content: data.text, isNew: true }]);
      } else {
        setMessages((prev) => [...prev, { id: Date.now() + 1, type: "bot", content: t.ai.errors.failResponse, isNew: true }]);
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages((prev) => [...prev, { id: Date.now() + 1, type: "bot", content: t.ai.errors.failConnect }]);
    } finally {
      setIsTyping(false);
    }
  }, [input, language, t.ai.errors.failResponse, t.ai.errors.failConnect]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="z-10000 bg-black/70!" />
        <DialogContent
          className={cn(
            "bg-white! border-none! outline-none! text-gray-900 p-0 gap-0 overflow-hidden transition-all duration-300 ease-in-out [&>button]:hidden flex flex-col",
            "w-screen! h-dvh! max-w-[100vw]! max-h-dvh! rounded-none!",
            "md:max-w-6xl! md:h-[85vh]! md:max-h-[85vh]! md:rounded-lg!",
            "z-10001"
          )}
        >
          <VisuallyHidden.Root>
            <DialogTitle>{t.ai.modalTitle}</DialogTitle>
            <DialogDescription>{t.ai.modalDescription}</DialogDescription>
          </VisuallyHidden.Root>

          {/* Header */}
          <div className="bg-gray-100 px-3 py-2 md:px-4 flex items-center justify-between shrink-0 z-10 border-b border-gray-200">
            {/* Desktop: macOS-style traffic lights */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => onOpenChange(false)}
                className="w-4 h-4 bg-[#ff5f57] border border-black/5 rounded-full flex items-center justify-center hover:bg-[#ff5f57]/90 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-2 h-2 text-white" strokeWidth={3} />
              </button>
              <div className="w-4 h-4 bg-[#ffbd2e]/50 border border-black/5 rounded-full" />
              <div className="w-4 h-4 bg-[#28c840]/50 border border-black/5 rounded-full" />
            </div>
            
            {/* Mobile: title on the left */}
            <div className="flex md:hidden items-center gap-2">
              <span className="text-xs font-semibold text-gray-700">{t.ai.headerTitleMobile}</span>
            </div>
            
            {/* Desktop: center title bar */}
            <div className="hidden md:flex flex-1 mx-4 bg-gray-200 rounded-md h-5 max-w-md items-center justify-center">
              <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">{t.ai.headerTitleDesktop}</span>
            </div>

            {/* Desktop: robot icon */}
            <div className="hidden md:flex w-10 justify-end">
              <OrsRobotIcon className="w-4 h-4" animated={false} />
            </div>
            
            {/* Mobile: close button (plain arrow) */}
            <button
              onClick={() => onOpenChange(false)}
              className="flex md:hidden items-center justify-center cursor-pointer p-1"
              aria-label="Close"
            >
              <ChevronRight className="w-5 h-5 text-gray-500" strokeWidth={2} />
            </button>
          </div>

          {/* Chat area */}
          <div className="flex flex-col flex-1 min-h-0 bg-white">
            {!hasStartedChat ? (
              <div className="flex-1 overflow-y-auto ai-chat-scrollbar p-3 md:p-6 flex flex-col" data-lenis-prevent>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full m-auto flex flex-col items-center max-w-6xl px-2 md:px-4"
                  >
                    <motion.h3 
                      layoutId="chat-title"
                      className="font-semibold text-gray-900 mb-4 md:mb-8 text-center text-xl md:text-3xl"
                    >
                      {t.ai.welcomeTitle}
                    </motion.h3>
                    
                    <div className="w-full mb-4 md:mb-6 max-w-3xl px-2 md:px-4">
                      {/* Box shadow removed as per instructions */}
                      <div className="relative flex items-center gap-1.5 md:gap-2 bg-neutral-50 rounded-full p-1.5 pl-2.5 md:p-2 md:pl-3 border border-neutral-200">
                        <motion.button
                          type="button"
                          onClick={toggleRecording}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={cn(
                            "w-9 h-9 flex items-center justify-center transition-colors shrink-0 rounded-full cursor-pointer",
                            isRecording ? "bg-red-500 text-white animate-pulse" : "text-gray-400 hover:text-gray-600"
                          )}
                          aria-label={isRecording ? t.ai.recording.stop : t.ai.recording.start}
                        >
                          {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </motion.button>
                        <textarea
                          ref={textareaRef}
                          value={input}
                          onChange={handleTextareaChange}
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => setIsFocused(false)}
                          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void handleSend(); } }}
                          placeholder={t.ai.inputPlaceholder}
                          rows={1}
                          className="flex-1 bg-transparent border-0 ring-0 focus:ring-0 outline-none focus:outline-none text-gray-900 placeholder:text-gray-400 py-2 md:py-2.5 resize-none text-[13px] md:text-[15px] leading-relaxed max-h-[120px] md:max-h-[150px] min-h-[24px]"
                        />
                        <div className="shrink-0 mb-1 mr-1">
                          <motion.button onClick={() => void handleSend()} disabled={!input.trim()} whileTap={input.trim() ? { scale: 0.95 } : {}} className={cn("h-9 w-9 rounded-full flex items-center justify-center transition-all duration-200", input.trim() ? "bg-[#226fd3] text-white cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed")} aria-label="Send message">
                            <ArrowUp className="h-5 w-5" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row flex-wrap justify-center gap-1.5 md:gap-2 w-full max-w-6xl px-2 md:px-4">
                      {t.ai.suggestedQuestions.map((question, idx) => (
                        <motion.button key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + idx * 0.1 }} onClick={() => setInput(question)} className="px-2.5 py-1 md:px-4 md:py-2 rounded-full border border-gray-200 text-gray-500 text-[11px] md:text-sm hover:border-[#226fd3] hover:text-[#226fd3] transition-all bg-white cursor-pointer whitespace-nowrap">
                          {question}
                        </motion.button>
                      ))}
                    </div>
                </motion.div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto ai-chat-scrollbar" ref={scrollRef} data-lenis-prevent>
                <div className="flex flex-col pb-4">
                  {messages.map((message) => (
                    <div key={message.id} className="px-3 py-3 md:px-4 md:py-6 w-full text-sm md:text-base">
                      <div className="mx-auto flex gap-2 md:gap-4 max-w-5xl px-2 md:px-4">
                        <div className={cn("relative flex-1 overflow-hidden leading-7", message.type === "user" && "max-w-[85%] ml-auto flex justify-end")}>
                          {message.type === "user" ? (
                            <div className="bg-[#226fd3] px-3.5 py-2 md:px-5 md:py-2.5 rounded-3xl text-white text-sm md:text-base">{message.content}</div>
                          ) : (
                            <div className="text-gray-700 pt-1 text-sm md:text-base leading-relaxed">
                              {message.isNew ? <TypingText text={message.content} onComplete={() => setMessages((prev) => prev.map((m) => m.id === message.id ? { ...m, isNew: false } : m))} /> : formatBotMessage(message.content)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="px-3 py-3 md:px-4 md:py-6 w-full">
                      <div className="mx-auto flex gap-2 md:gap-4 max-w-5xl px-2 md:px-4">
                        <div className="pt-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-[#226fd3] animate-bounce" style={{ animationDelay: "0ms" } as CSSProperties} />
                            <div className="w-2 h-2 rounded-full bg-[#226fd3] animate-bounce" style={{ animationDelay: "150ms" } as CSSProperties} />
                            <div className="w-2 h-2 rounded-full bg-[#226fd3] animate-bounce" style={{ animationDelay: "300ms" } as CSSProperties} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {hasStartedChat && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-3 py-1 md:px-4 shrink-0 bg-linear-to-t from-white via-white to-transparent">
                <div className="mx-auto max-w-5xl px-2 md:px-4">
                  <div className="relative flex items-center gap-1.5 md:gap-2 bg-neutral-50 rounded-full p-1.5 pl-2.5 md:p-2 md:pl-3 border border-neutral-200">
                    <motion.button type="button" onClick={toggleRecording} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={cn("w-9 h-9 flex items-center justify-center transition-colors shrink-0 rounded-full cursor-pointer", isRecording ? "bg-red-500 text-white animate-pulse" : "text-gray-400 hover:text-gray-600")} aria-label={isRecording ? t.ai.recording.stop : t.ai.recording.start}>
                      {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </motion.button>
                    <textarea ref={textareaRef} value={input} onChange={handleTextareaChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void handleSend(); } }} placeholder={t.ai.inputPlaceholderContinue} rows={1} className="flex-1 bg-transparent border-0 ring-0 focus:ring-0 outline-none focus:outline-none text-gray-900 placeholder:text-gray-400 py-2 md:py-2.5 resize-none text-[13px] md:text-[15px] leading-relaxed max-h-[120px] md:max-h-[150px] min-h-[24px]" />
                    <div className="shrink-0 mb-1 mr-1">
                      <motion.button onClick={() => void handleSend()} disabled={!input.trim()} whileTap={input.trim() ? { scale: 0.95 } : {}} className={cn("h-9 w-9 rounded-full flex items-center justify-center transition-all duration-200", input.trim() ? "bg-[#226fd3] text-white cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed")} aria-label="Send message">
                        <ArrowUp className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="text-center mt-1">
                    <p className="text-[11px] text-gray-400">{t.ai.disclaimer}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export const AiAssistantModal = memo(AiAssistantModalComponent);
