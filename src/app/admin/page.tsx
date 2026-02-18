
'use client';

import { useState, useEffect } from 'react';
import { verifyAdminPassword } from '@/app/actions';
import Inbox from '@/components/inbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Shield, KeyRound, LogIn } from 'lucide-react';

/**
 * Renders the admin page, which is a protected route for viewing contact form submissions.
 * It handles authentication via a password stored in session storage.
 * @returns {JSX.Element} The rendered admin page or authentication form.
 */
export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const authStatus = sessionStorage.getItem('isAdminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await verifyAdminPassword(password);
    setLoading(false);
    if (result.success) {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      toast({
        title: 'Success',
        description: 'Authentication successful. Welcome!',
      });
    } else {
      setError(result.error || 'An unknown error occurred.');
      toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: result.error || 'Invalid password.',
      });
    }
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    sessionStorage.removeItem('isAdminAuthenticated');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="w-full max-w-md mx-auto p-8 space-y-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg">
            <div className="text-center">
              <Shield className="mx-auto h-12 w-12 text-primary" />
              <h1 className="mt-4 text-2xl font-bold font-headline text-white">Admin Access</h1>
              <p className="mt-2 text-muted-foreground">Please enter the password to view your inbox.</p>
            </div>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-10"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full button-gradient-primary shadow-lg shadow-primary/20 hover:scale-105 transition-transform cursor-target">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Authenticate
                  </>
                )}
              </Button>
              {error && <p className="text-sm text-center text-destructive">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-200px)] py-8">
      <Inbox onLogout={handleLogout} />
    </div>
  );
}
