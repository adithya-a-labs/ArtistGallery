import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      setFormData({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: "",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="font-serif text-4xl font-bold mb-4">Get In Touch</h3>
          <div className="artistic-divider h-0.5 w-24 mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground">
            Have questions about a piece or interested in commissioning custom artwork?
          </p>
        </div>
        
        <Card className="shadow-xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                    <SelectItem value="Purchase Question">Purchase Question</SelectItem>
                    <SelectItem value="Commission Request">Commission Request</SelectItem>
                    <SelectItem value="Gallery Exhibition">Gallery Exhibition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  rows={6}
                  placeholder="Tell me about your interest in my artwork..."
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                  className="resize-none"
                />
              </div>
              
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  size="lg"
                  className="bg-charcoal text-white hover:bg-golden transition-all duration-300 font-medium transform hover:scale-105"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Contact Information */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-golden rounded-full flex items-center justify-center mx-auto">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-serif text-lg font-semibold">Email</h4>
            <p className="text-muted-foreground">elena@artiste.com</p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 bg-golden rounded-full flex items-center justify-center mx-auto">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-serif text-lg font-semibold">Phone</h4>
            <p className="text-muted-foreground">+1 (555) 123-4567</p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 bg-golden rounded-full flex items-center justify-center mx-auto">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-serif text-lg font-semibold">Studio</h4>
            <p className="text-muted-foreground">San Francisco, CA</p>
          </div>
        </div>
      </div>
    </section>
  );
}
