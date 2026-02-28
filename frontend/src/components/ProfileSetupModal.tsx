import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sprout } from 'lucide-react';

interface ProfileSetupModalProps {
    onSave: (name: string) => Promise<void>;
    isSaving: boolean;
}

export default function ProfileSetupModal({ onSave, isSaving }: ProfileSetupModalProps) {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Please enter your name');
            return;
        }
        setError('');
        await onSave(name.trim());
    };

    return (
        <Dialog open>
            <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Sprout className="w-5 h-5 text-primary" />
                        </div>
                        <DialogTitle className="text-xl font-bold">Welcome to Roaf Agro Traders!</DialogTitle>
                    </div>
                    <DialogDescription>
                        Please enter your name to complete your profile setup.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                    <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                            id="name"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isSaving}
                            autoFocus
                        />
                        {error && <p className="text-sm text-destructive">{error}</p>}
                    </div>
                    <Button type="submit" className="w-full" disabled={isSaving || !name.trim()}>
                        {isSaving ? (
                            <span className="flex items-center gap-2">
                                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></span>
                                Saving...
                            </span>
                        ) : (
                            'Get Started'
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
