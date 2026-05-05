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
    <div className="flex flex-col gap-6 p-2 md:p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Syndic Management</h1>
          <p className="text-sm text-neutral-500">Manage registered syndics and generate activation keys.</p>
        </div>
        
        <Dialog onOpenChange={(open) => !open && resetForm()}>
          <DialogTrigger asChild>
            <Button className="gap-2 shrink-0">
              <Plus className="h-4 w-4" />
              Add New Syndic
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Register New Syndic</DialogTitle>
              <DialogDescription>
                Enter the syndic's details to generate a unique activation key they can use to register.
              </DialogDescription>
            </DialogHeader>
            
            {!generatedKey ? (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="company">Company / Agency Name</Label>
                  <Input 
                    id="company" 
                    placeholder="e.g. Benali Management" 
                    value={newSyndicForm.companyName}
                    onChange={(e) => setNewSyndicForm({...newSyndicForm, companyName: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact">Contact Person Name</Label>
                  <Input 
                    id="contact" 
                    placeholder="e.g. Ahmed Benali" 
                    value={newSyndicForm.contactName}
                    onChange={(e) => setNewSyndicForm({...newSyndicForm, contactName: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="contact@agency.com" 
                    value={newSyndicForm.email}
                    onChange={(e) => setNewSyndicForm({...newSyndicForm, email: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="plan">Subscription Plan</Label>
                  <select 
                    id="plan" 
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                  <p className="text-sm text-neutral-500 mt-1">Send this key to the syndic to allow them to register.</p>
                </div>
                
                <div className="w-full bg-neutral-100 p-4 rounded-md flex items-center justify-between mt-4 border border-neutral-200">
                  <code className="font-mono text-lg font-bold tracking-wider">{generatedKey}</code>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => copyToClipboard(generatedKey)}
                    className="h-8 w-8"
                  >
                    {copiedKey === generatedKey ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
            
            <DialogFooter>
              {!generatedKey ? (
                <Button 
                  onClick={handleGenerateKey} 
                  disabled={!newSyndicForm.companyName || !newSyndicForm.contactName || !newSyndicForm.email}
                >
                  <Key className="h-4 w-4 mr-2" />
                  Generate Key
                </Button>
              ) : (
                <Button variant="outline" onClick={resetForm}>
                  Create Another
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none shadow-xs">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <CardTitle>Registered Syndics ({syndics.length})</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
              <Input
                type="search"
                placeholder="Search syndics..."
                className="w-full pl-9 bg-neutral-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-neutral-500 bg-neutral-50/50 uppercase border-y border-neutral-100">
                <tr>
                  <th className="px-4 py-3 font-medium">Syndic / Company</th>
                  <th className="px-4 py-3 font-medium">Contact Details</th>
                  <th className="px-4 py-3 font-medium text-center">Buildings</th>
                  <th className="px-4 py-3 font-medium">Plan</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredSyndics.length > 0 ? (
                  filteredSyndics.map((syndic) => (
                    <tr key={syndic.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-neutral-900">{syndic.company}</div>
                        <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                          <Users className="h-3 w-3" /> {syndic.name}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-neutral-900">{syndic.email}</div>
                        <div className="text-xs text-neutral-500">{syndic.phone}</div>
                      </td>
                      <td className="px-4 py-3 text-center font-medium">
                        {syndic.buildings}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="font-normal bg-neutral-50">
                          {syndic.subscription}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge 
                          variant={syndic.status === 'Active' ? 'success' : 'warning'} 
                          className={syndic.status === 'Active' ? 'bg-green-100 text-green-800 border-transparent hover:bg-green-200' : 'bg-amber-100 text-amber-800 border-transparent hover:bg-amber-200'}
                        >
                          {syndic.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Plan</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Suspend Account</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-neutral-500">
                      No syndics found matching "{searchQuery}"
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
