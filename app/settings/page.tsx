"use client";

import { DashboardLayout } from "@/components/ui/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Github, ExternalLink, CheckCircle, XCircle } from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [aiProvider, setAiProvider] = useState("ollama");
  const [notifications, setNotifications] = useState(true);

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account, integrations, and preferences
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                <AvatarFallback className="text-lg">
                  {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{session?.user?.name || "User"}</CardTitle>
                <CardDescription>{session?.user?.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connected Accounts</CardTitle>
            <CardDescription>Link your development tools to FlowForge</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Github className="h-5 w-5" />
                <div>
                  <p className="font-medium">GitHub</p>
                  <p className="text-sm text-muted-foreground">
                    {session?.user?.email ? "Connected" : "Not connected"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {session?.user?.email ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Button variant="outline" size="sm">Connect</Button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <ExternalLink className="h-5 w-5" />
                <div>
                  <p className="font-medium">Jira</p>
                  <p className="text-sm text-muted-foreground">Connect your Jira project</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <div>
                  <p className="font-medium">Google</p>
                  <p className="text-sm text-muted-foreground">Connected as {session?.user?.email}</p>
                </div>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Provider</CardTitle>
            <CardDescription>Configure which AI model powers your automation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="provider">Provider</Label>
              <select
                id="provider"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={aiProvider}
                onChange={(e) => setAiProvider(e.target.value)}
              >
                <option value="ollama">Ollama (Local - Free)</option>
                <option value="openai">OpenAI (Paid)</option>
                <option value="anthropic">Anthropic (Paid)</option>
              </select>
            </div>

            {aiProvider === "ollama" && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="ollamaUrl">Ollama URL</Label>
                  <Input id="ollamaUrl" defaultValue="http://localhost:11434" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ollamaModel">Model</Label>
                  <Input id="ollamaModel" defaultValue="llama3.2" />
                </div>
              </>
            )}

            {aiProvider === "openai" && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="openaiKey">API Key</Label>
                  <Input id="openaiKey" type="password" placeholder="sk-..." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="openaiModel">Model</Label>
                  <Input id="openaiModel" defaultValue="gpt-4o-mini" />
                </div>
              </>
            )}

            {aiProvider === "anthropic" && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="anthropicKey">API Key</Label>
                  <Input id="anthropicKey" type="password" placeholder="sk-ant-..." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="anthropicModel">Model</Label>
                  <Input id="anthropicModel" defaultValue="claude-3-5-sonnet-20241022" />
                </div>
              </>
            )}

            <Button>Save Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Choose what updates you want to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email notifications</p>
                <p className="text-sm text-muted-foreground">Receive updates about PR reviews and task changes</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">In-app notifications</p>
                <p className="text-sm text-muted-foreground">Show notifications within FlowForge</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
