"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AnimatedArrow } from "@/components/ui/animated-arrow"
import { useLanguage } from "@/lib/language-context"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ContactForm() {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubjectChange = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.firstName || !formData.email || !formData.message) {
      toast.error(t.contactPage.form.labels.firstName + ", " + t.contactPage.form.labels.email + " & " + t.contactPage.form.labels.message + " are required")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.subject,
          message: formData.message,
          subject: `Nouvelle demande de contact de ${formData.firstName} ${formData.lastName}`
        }),
      })

      if (response.ok) {
        toast.success("Message sent successfully!")
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: ""
        })
      } else {
        toast.error("Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsAppClick = () => {
    const { firstName, lastName, email, phone, company, subject, message } = formData
    
    // Construct the structured message
    const text = `*New Project Inquiry from Get a Quote Form*%0A%0A` +
      `*${t.contactPage.form.labels.firstName}:* ${firstName} ${lastName}%0A` +
      `*${t.contactPage.form.labels.email}:* ${email}%0A` +
      `*${t.contactPage.form.labels.phone}:* ${phone || "Not specified"}%0A` +
      `*${t.contactPage.form.labels.company}:* ${company || "Not specified"}%0A` +
      `*${t.contactPage.form.labels.subject}:* ${subject || "Not specified"}%0A%0A` +
      `*${t.contactPage.form.labels.message}:*%0A${message || "No details provided."}`
    
    const whatsappUrl = `https://wa.me/212660715095?text=${text}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="bg-white border-2 border-neutral-200 rounded-sm px-2 py-4 md:py-6 md:px-8">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName" className="font-semibold px-2 text-xs md:text-sm">{t.contactPage.form.labels.firstName} *</Label>
            <Input 
              id="firstName" 
              placeholder={t.contactPage.form.placeholders.firstName} 
              value={formData.firstName}
              onChange={handleChange}
              className="bg-neutral-50 border-neutral-200 h-11 md:h-12 rounded-sm focus-visible:ring-primary/20 focus-visible:ring-4 focus-visible:border-primary px-6 text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="lastName" className="font-semibold px-2 text-xs md:text-sm">{t.contactPage.form.labels.lastName}</Label>
            <Input 
              id="lastName" 
              placeholder={t.contactPage.form.placeholders.lastName} 
              value={formData.lastName}
              onChange={handleChange}
              className="bg-neutral-50 border-neutral-200 h-11 md:h-12 rounded-sm focus-visible:ring-primary/20 focus-visible:ring-4 focus-visible:border-primary px-6 text-sm"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="font-semibold px-2 text-xs md:text-sm">{t.contactPage.form.labels.email} *</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder={t.contactPage.form.placeholders.email} 
            value={formData.email}
            onChange={handleChange}
            className="bg-neutral-50 border-neutral-200 h-11 md:h-12 rounded-sm focus-visible:ring-primary/20 focus-visible:ring-4 focus-visible:border-primary px-6 text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="phone" className="font-semibold px-2 text-xs md:text-sm">{t.contactPage.form.labels.phone}</Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder={t.contactPage.form.placeholders.phone} 
            value={formData.phone}
            onChange={handleChange}
            className="bg-neutral-50 border-neutral-200 h-11 md:h-12 rounded-sm focus-visible:ring-primary/20 focus-visible:ring-4 focus-visible:border-primary px-6 text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="company" className="font-semibold px-2 text-xs md:text-sm">{t.contactPage.form.labels.company}</Label>
          <Input 
            id="company" 
            placeholder={t.contactPage.form.placeholders.company} 
            value={formData.company}
            onChange={handleChange}
            className="bg-neutral-50 border-neutral-200 h-11 md:h-12 rounded-sm focus-visible:ring-primary/20 focus-visible:ring-4 focus-visible:border-primary px-6 text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="subject" className="font-semibold px-2 text-xs md:text-sm">{t.contactPage.form.labels.subject}</Label>
          <Select onValueChange={handleSubjectChange}>
            <SelectTrigger className="bg-neutral-50 border-neutral-200 h-11 md:h-12 rounded-sm cursor-pointer focus-visible:ring-primary/20 focus-visible:ring-4 focus-visible:border-primary px-6 text-sm w-full text-left transition-all duration-300">
              <SelectValue placeholder={t.contactPage.form.placeholders.subject} />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-neutral-200 shadow-xl bg-white">
              <SelectItem value={t.contactPage.form.subjects.demo}>{t.contactPage.form.subjects.demo}</SelectItem>
              <SelectItem value={t.contactPage.form.subjects.sales}>{t.contactPage.form.subjects.sales}</SelectItem>
              <SelectItem value={t.contactPage.form.subjects.support}>{t.contactPage.form.subjects.support}</SelectItem>
              <SelectItem value={t.contactPage.form.subjects.partnership}>{t.contactPage.form.subjects.partnership}</SelectItem>
              <SelectItem value={t.contactPage.form.subjects.other}>{t.contactPage.form.subjects.other}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 md:mt-1">
          <Label htmlFor="message" className="font-semibold px-2 text-xs md:text-sm">{t.contactPage.form.labels.message} *</Label>
          <Textarea 
            id="message" 
            placeholder={t.contactPage.form.placeholders.message} 
            value={formData.message}
            onChange={handleChange}
            className="bg-neutral-50 border-neutral-200 min-h-[140px] rounded-sm resize-none focus-visible:ring-primary/20 focus-visible:ring-4 focus-visible:border-primary px-6 py-5 text-sm"
          />
        </div>

        <div className="flex flex-row gap-2 mt-4 w-full">
          <Button 
            type="submit" 
            size="lg" 
            disabled={isSubmitting}
            className="flex-7 bg-black hover:bg-black/90 text-white font-bold rounded-sm h-12 md:h-14 px-3 md:px-4 text-[11px] md:text-base flex items-center justify-between transition-all duration-300 group whitespace-nowrap cursor-pointer text-left disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : t.contactPage.form.submit}
            {!isSubmitting && <AnimatedArrow wrapperClassName="bg-white shrink-0 ml-1 md:ml-2" arrowClassName="text-black" />}
          </Button>
          
          <button 
            type="button"
            onClick={handleWhatsAppClick}
            className="flex-3 min-w-fit flex items-center justify-between h-12 md:h-14 px-3 md:px-4 rounded-sm border-2 border-neutral-200 hover:border-[#25D366] bg-white text-black hover:text-[#25D366] font-bold transition-all duration-300 whitespace-nowrap cursor-pointer text-left"
          >
            <div className="flex items-center gap-1.5 md:gap-3">
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6 fill-[#25D366] shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="text-xs md:text-base">{t.contactPage.form.whatsapp}</span>
            </div>
          </button>
        </div>
        
        <p className="text-[10px] md:text-xs text-center text-muted-foreground mt-2 px-4">
          {t.contactPage.form.footerAgreement}
        </p>
      </form>
    </div>
  )
}
