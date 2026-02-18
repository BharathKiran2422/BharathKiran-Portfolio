
'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getMessages, deleteMessage, toggleMessageReadStatus, type Message } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';
import { Loader2, Trash2, Eye, Mail, MoreVertical, LogOut, Inbox as InboxIcon, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";


interface InboxProps {
  onLogout: () => void;
}

/**
 * Renders the inbox interface for the admin panel.
 * It fetches, displays, and allows management of messages from the contact form.
 * @param {InboxProps} { onLogout } - A function to handle user logout.
 * @returns {JSX.Element} The rendered inbox component.
 */
export default function Inbox({ onLogout }: InboxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { toast } = useToast();

  const fetchMessages = async () => {
    setLoading(true);
    const { messages: fetchedMessages, error: fetchError } = await getMessages();
    if (fetchError) {
      setError(fetchError);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to load messages: ${fetchError}`,
      });
    } else {
      setMessages(fetchedMessages || []);
    }
    setLoading(false);
  };
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchMessages();
    setIsRefreshing(false);
     toast({
        title: 'Inbox Refreshed',
        description: 'Your messages are up to date.',
      });
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (id: string, currentStatus: boolean) => {
    const result = await toggleMessageReadStatus(id, currentStatus);
    if (result.success) {
      setMessages(messages.map(msg => msg.id === id ? { ...msg, read: !currentStatus } : msg));
      toast({
        title: 'Success',
        description: `Message marked as ${!currentStatus ? 'read' : 'unread'}.`,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
  };

  const handleDelete = async () => {
    if (!messageToDelete) return;
    const result = await deleteMessage(messageToDelete);
    if (result.success) {
      setMessages(messages.filter(msg => msg.id !== messageToDelete));
      toast({
        title: 'Success',
        description: 'Message deleted successfully.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
    setIsDeleteDialogOpen(false);
    setMessageToDelete(null);
  };
  
  const unreadCount = useMemo(() => messages.filter(msg => !msg.read).length, [messages]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 min-h-[calc(100vh-160px)]">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <InboxIcon className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold font-headline text-white">Inbox</h1>
          <Badge variant="secondary">{unreadCount} Unread</Badge>
        </div>
        <div className="flex items-center gap-2">
            <Button onClick={handleRefresh} variant="outline" size="icon" className="cursor-target h-9 w-9">
              <RefreshCcw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
            </Button>
            <Button onClick={onLogout} variant="outline" className="cursor-target">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">Loading messages...</p>
          </div>
        ) : error ? (
          <div className="text-center p-8">
            <p className="text-destructive">{error}</p>
            <Button onClick={fetchMessages} className="mt-4">Try Again</Button>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center p-16">
             <Mail className="mx-auto h-12 w-12 text-muted-foreground" />
             <h2 className="mt-4 text-xl font-semibold text-white">No messages yet</h2>
             <p className="mt-2 text-muted-foreground">When new messages arrive, they'll appear here.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="w-[10px] hidden md:table-cell"></TableHead>
                <TableHead className="w-[180px]">From</TableHead>
                <TableHead>Subject & Message</TableHead>
                <TableHead className="w-[150px] hidden md:table-cell">Received</TableHead>
                <TableHead className="w-[50px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message) => (
                <TableRow
                  key={message.id}
                  className={cn(
                    "cursor-pointer border-white/10",
                    !message.read ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-white/5'
                  )}
                  onClick={() => {
                    setSelectedMessage(message);
                    setIsViewDialogOpen(true);
                    if (!message.read) {
                      handleToggleRead(message.id, message.read);
                    }
                  }}
                >
                  <TableCell className="hidden md:table-cell">
                    {!message.read && <div className="h-2 w-2 rounded-full bg-primary" />}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-white">{message.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{message.email}</div>
                  </TableCell>
                  <TableCell>
                    <div className={cn("font-medium", !message.read && "text-white")}>{message.subject}</div>
                    <p className="text-sm text-muted-foreground truncate max-w-md">
                      {message.message}
                    </p>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-xs">
                    {message.createdAt ? format(parseISO(message.createdAt), "PPp") : ''}
                  </TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenuItem onClick={() => handleToggleRead(message.id, message.read)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Mark as {message.read ? 'Unread' : 'Read'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => {
                            setMessageToDelete(message.id);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

        {/* View Message Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="sm:max-w-2xl bg-background border-border">
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl text-white">{selectedMessage?.subject}</DialogTitle>
                    <DialogDescription>
                        From: {selectedMessage?.name} &lt;{selectedMessage?.email}&gt;<br/>
                        Received: {selectedMessage && selectedMessage.createdAt ? format(parseISO(selectedMessage.createdAt), "PPPPp") : ''}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 whitespace-pre-wrap text-muted-foreground">
                    {selectedMessage?.message}
                </div>
                 <DialogClose asChild>
                    <Button type="button" variant="secondary" className="mt-4">
                        Close
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>


      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the message.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setMessageToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
