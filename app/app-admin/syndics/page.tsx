"use client"

import * as React from "react"
import {
  Users,
  Search,
  Plus,
  MoreVertical,
  Key,
  Copy,
  Check,
  Building,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { initialSyndicsList as initialSyndics } from "@/lib/app-admin-mock-data"

export default function ManageSyndicsPage() {
  const [mounted, setMounted] = React.useState(false)
  const [syndics, setSyndics] = React.useState(initialSyndics)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null)
  
  // New Syndic Form State
  const [newSyndicForm, setNewSyndicForm] = React.useState({
    companyName: "",
    contactName: "",
    email: "",
    subscription: "Standard"
  })
  const [generatedKey, setGeneratedKey] = React.useState<string | null>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const filteredSyndics = syndics.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleGenerateKey = () => {
    if (!newSyndicForm.companyName || !newSyndicForm.contactName || !newSyndicForm.email) return;
    
    // Generate a random activation key (e.g., ORS-ABCD-1234-WXYZ)
    const segments = Array.from({length: 3}, () => 
      Math.random().toString(36).substring(2, 6).toUpperCase()
    );
    const key = `ORS-${segments.join('-')}`;
    
    setGeneratedKey(key);
    
    // In a real app, this would save to the DB as 'Pending'
    setSyndics(prev => [{
      id: Date.now().toString(),
      name: newSyndicForm.contactName,
      email: newSyndicForm.email,
      phone: "—",
      company: newSyndicForm.companyName,
      buildings: 0,
      status: "Pending",
      joined: "Just now",
      subscription: newSyndicForm.subscription
    }, ...prev])
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2000);
  }

  const resetForm = () => {
    setNewSyndicForm({ companyName: "", contactName: "", email: "", subscription: "Standard" });
    setGeneratedKey(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Dialog onOpenChange={(open) => !open && resetForm()}>
          <DialogTrigger asChild>
            <Button className="gap-2 shrink-0 cursor-pointer text-sm h-9">
              <Plus className="h-4 w-4" />
              Add New Syndic
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
            <DialogHeader>
              <DialogTitle>Register New Syndic</DialogTitle>
              <DialogDescription className="text-xs">
                Enter the syndic's details to generate a unique activation key they can use to register.
              </DialogDescription>
            </DialogHeader>
            
            {!generatedKey ? (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="company" className="text-xs">Company / Agency Name</Label>
                  <Input 
                    id="company" 
                    placeholder="e.g. Benali Management" 
                    className="bg-neutral-100 border-none rounded-sm"
                    value={newSyndicForm.companyName}
                    onChange={(e) => setNewSyndicForm({...newSyndicForm, companyName: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact" className="text-xs">Contact Person Name</Label>
                  <Input 
                    id="contact" 
                    placeholder="e.g. Ahmed Benali" 
                    className="bg-neutral-100 border-none rounded-sm"
                    value={newSyndicForm.contactName}
                    onChange={(e) => setNewSyndicForm({...newSyndicForm, contactName: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-xs">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="contact@agency.com" 
                    className="bg-neutral-100 border-none rounded-sm"
                    value={newSyndicForm.email}
                    onChange={(e) => setNewSyndicForm({...newSyndicForm, email: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="plan" className="text-xs">Subscription Plan</Label>
                  <select 
                    id="plan" 
                    className="flex h-10 w-full items-center justify-between rounded-sm border-none bg-neutral-100 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20"
                    value={newSyndicForm.subscription}
                    onChange={(e) => setNewSyndicForm({...newSyndicForm, subscription: e.target.value})}
                  >
                    <option value="Starter">Starter (Up to 2 Buildings)</option>
                    <option value="Standard">Standard (Up to 10 Buildings)</option>
                    <option value="Premium">Premium (Up to 25 Buildings)</option>
                    <option value="Enterprise">Enterprise (Unlimited)</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Activation Key Generated!</h3>
                  <p className="text-xs text-neutral-500 mt-1">Send this key to the syndic to allow them to register.</p>
                </div>
                
                <div className="w-full bg-neutral-100 p-4 rounded-sm flex items-center justify-between mt-4 border border-black/5">
                  <code className="font-mono text-lg font-bold tracking-wider">{generatedKey}</code>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => copyToClipboard(generatedKey)}
                    className="h-8 w-8 hover:bg-black/5 cursor-pointer"
                  >
                    {copiedKey === generatedKey ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
            
            <DialogFooter>
              {!generatedKey ? (
                <Button 
                  className="w-full cursor-pointer"
                  onClick={handleGenerateKey} 
                  disabled={!newSyndicForm.companyName || !newSyndicForm.contactName || !newSyndicForm.email}
                >
                  <Key className="h-4 w-4 mr-2" />
                  Generate Key
                </Button>
              ) : (
                <Button variant="outline" className="w-full cursor-pointer border-none bg-neutral-100" onClick={resetForm}>
                  Create Another
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            type="search"
            placeholder="Search syndics..."
            className="w-full pl-9 bg-neutral-100 border-none rounded-sm h-9 text-sm shadow-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card className="border-none bg-neutral-100">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-neutral-500 border-b border-black/5 uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-4 py-3 font-bold">Syndic / Company</th>
                  <th className="px-4 py-3 font-bold">Contact Details</th>
                  <th className="px-4 py-3 font-bold text-center">Buildings</th>
                  <th className="px-4 py-3 font-bold">Plan</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                  <th className="px-4 py-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filteredSyndics.length > 0 ? (
                  filteredSyndics.map((syndic) => (
                    <tr key={syndic.id} className="hover:bg-black/5 transition-colors group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-black/5 shrink-0">
                            <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                              {syndic.company.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-neutral-900 leading-none">{syndic.company}</div>
                            <div className="text-[10px] text-neutral-500 flex items-center gap-1 mt-1">
                              <Users className="h-3 w-3" /> {syndic.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-neutral-900 text-xs font-medium">{syndic.email}</div>
                        <div className="text-[10px] text-neutral-500 mt-0.5">{syndic.phone}</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-xs font-bold bg-white px-2 py-1 rounded-sm border border-black/5 shadow-xs">
                          {syndic.buildings}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="font-bold text-[10px] bg-white border-black/5 text-neutral-700">
                          {syndic.subscription.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge 
                          className={`text-[10px] font-bold border-none shadow-xs ${
                            syndic.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {syndic.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer rounded-full hover:bg-black/5">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white border-none shadow-lg rounded-sm p-1.5 min-w-[150px]">
                            <DropdownMenuLabel className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer text-xs rounded-sm py-2 px-3 hover:bg-primary/5">View Details</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-xs rounded-sm py-2 px-3 hover:bg-primary/5">Edit Plan</DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-black/5 my-1" />
                            <DropdownMenuItem className="cursor-pointer text-xs rounded-sm py-2 px-3 text-red-600 hover:bg-red-50 hover:text-red-600">Suspend Account</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Users className="h-10 w-10 text-neutral-300 mb-2" />
                        <p className="text-sm text-neutral-500 font-medium">No syndics found</p>
                        <p className="text-xs text-neutral-400 mt-1">Try adjusting your search query</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
