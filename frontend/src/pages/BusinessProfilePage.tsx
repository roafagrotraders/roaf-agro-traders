import { useGetBusinessProfile } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, Building2, Sprout, Award, MapPin, ShieldCheck, Phone, Mail, Truck, KeyRound } from 'lucide-react';

// Animated vine/leaf border accent
function AnimatedLeafAccent({ side = 'left' }: { side?: 'left' | 'right' }) {
    const isRight = side === 'right';
    return (
        <div
            className={`absolute top-0 ${isRight ? 'right-0' : 'left-0'} h-full w-12 pointer-events-none overflow-hidden hidden lg:block`}
            style={{ transform: isRight ? 'scaleX(-1)' : undefined }}
        >
            {/* Vine stem */}
            <svg viewBox="0 0 48 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
                <path
                    d="M24 400 C24 400 20 350 24 300 C28 250 18 200 24 150 C30 100 20 50 24 0"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="text-success/20"
                />
                {/* Leaves along vine */}
                <ellipse cx="14" cy="80" rx="10" ry="6" fill="currentColor" className="text-success/15" transform="rotate(-30 14 80)" />
                <ellipse cx="32" cy="140" rx="10" ry="6" fill="currentColor" className="text-success/15" transform="rotate(25 32 140)" />
                <ellipse cx="12" cy="200" rx="10" ry="6" fill="currentColor" className="text-success/15" transform="rotate(-35 12 200)" />
                <ellipse cx="34" cy="260" rx="10" ry="6" fill="currentColor" className="text-success/15" transform="rotate(20 34 260)" />
                <ellipse cx="14" cy="320" rx="10" ry="6" fill="currentColor" className="text-success/15" transform="rotate(-25 14 320)" />
            </svg>
            {/* Animated floating leaves */}
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-success/30 animate-float-up absolute top-[15%] left-1">
                <path d="M20 38 C20 38 4 28 4 14 C4 6 12 2 20 2 C28 2 36 6 36 14 C36 28 20 38 20 38Z" fill="currentColor" />
            </svg>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-primary/25 animate-float-up-delayed absolute top-[45%] left-2">
                <path d="M20 38 C20 38 4 28 4 14 C4 6 12 2 20 2 C28 2 36 6 36 14 C36 28 20 38 20 38Z" fill="currentColor" />
            </svg>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 text-success/20 animate-float-up-slow absolute top-[70%] left-1">
                <path d="M20 38 C20 38 4 28 4 14 C4 6 12 2 20 2 C28 2 36 6 36 14 C36 28 20 38 20 38Z" fill="currentColor" />
            </svg>
        </div>
    );
}

export default function BusinessProfilePage() {
    const { data: profile, isLoading, error } = useGetBusinessProfile();

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative overflow-hidden bg-primary py-16">
                <div className="absolute inset-0 opacity-10">
                    <img
                        src="/assets/generated/hero-banner.dim_1200x400.png"
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                </div>

                {/* Animated wheat stalks in hero */}
                <div className="absolute bottom-0 left-0 flex items-end gap-2 pl-6 pointer-events-none opacity-20">
                    {[28, 36, 22, 32, 18].map((h, i) => (
                        <svg key={i} viewBox="0 0 24 80" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className={`text-primary-foreground origin-bottom ${
                                i % 2 === 0 ? 'animate-sway' : i % 3 === 0 ? 'animate-sway-delayed' : 'animate-sway-alt'
                            }`}
                            style={{ height: `${h * 4}px` }}>
                            <line x1="12" y1="80" x2="12" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <ellipse cx="12" cy="8" rx="4" ry="7" fill="currentColor" opacity="0.9" />
                            <ellipse cx="7" cy="18" rx="3" ry="5" fill="currentColor" opacity="0.75" transform="rotate(-20 7 18)" />
                            <ellipse cx="17" cy="18" rx="3" ry="5" fill="currentColor" opacity="0.75" transform="rotate(20 17 18)" />
                        </svg>
                    ))}
                </div>
                <div className="absolute bottom-0 right-0 flex items-end gap-2 pr-6 pointer-events-none opacity-20">
                    {[24, 34, 20, 30].map((h, i) => (
                        <svg key={i} viewBox="0 0 24 80" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className={`text-primary-foreground origin-bottom ${
                                i % 2 === 0 ? 'animate-sway-slow' : 'animate-sway-delayed'
                            }`}
                            style={{ height: `${h * 4}px` }}>
                            <line x1="12" y1="80" x2="12" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <ellipse cx="12" cy="8" rx="4" ry="7" fill="currentColor" opacity="0.9" />
                            <ellipse cx="7" cy="18" rx="3" ry="5" fill="currentColor" opacity="0.75" transform="rotate(-20 7 18)" />
                            <ellipse cx="17" cy="18" rx="3" ry="5" fill="currentColor" opacity="0.75" transform="rotate(20 17 18)" />
                        </svg>
                    ))}
                </div>

                {/* Floating leaf particles in hero */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-primary-foreground/20 animate-leaf-drift absolute top-8 left-1/4">
                        <path d="M20 38 C20 38 4 28 4 14 C4 6 12 2 20 2 C28 2 36 6 36 14 C36 28 20 38 20 38Z" fill="currentColor" />
                    </svg>
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-primary-foreground/15 animate-leaf-drift-delayed absolute top-16 right-1/3">
                        <path d="M20 38 C20 38 4 28 4 14 C4 6 12 2 20 2 C28 2 36 6 36 14 C36 28 20 38 20 38Z" fill="currentColor" />
                    </svg>
                </div>

                <div className="relative container mx-auto px-4 text-center">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-primary-foreground/10 mx-auto mb-6 flex items-center justify-center animate-grow-in">
                        <img
                            src="/assets/generated/roaf-logo.dim_256x256.png"
                            alt="Roaf Agro Traders Logo"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-primary-foreground text-4xl">🌾</span>';
                            }}
                        />
                    </div>
                    <h1 className="text-4xl font-bold font-serif text-primary-foreground mb-3">About Us</h1>
                    <p className="text-primary-foreground/80 max-w-xl mx-auto mb-6">
                        Learn more about Roaf Agro Traders and our commitment to quality agricultural solutions.
                    </p>
                    {/* Authorized Dealer Badge in Hero */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <div className="flex items-center gap-2 bg-amber-600/80 backdrop-blur-sm rounded-full px-5 py-2 border border-amber-400/30">
                            <Award className="w-4 h-4 text-white" />
                            <span className="text-sm font-bold text-white">Authorized Dealer – Srachi, Kashmir Province</span>
                        </div>
                        <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-5 py-2 border border-primary-foreground/20">
                            <Truck className="w-4 h-4 text-primary-foreground" />
                            <span className="text-sm font-semibold text-primary-foreground">Home Delivery Available</span>
                        </div>
                        <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-5 py-2 border border-primary-foreground/20">
                            <KeyRound className="w-4 h-4 text-primary-foreground" />
                            <span className="text-sm font-semibold text-primary-foreground">Machines on Rent</span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 max-w-4xl relative">
                {/* Animated vine leaf accents on sides */}
                <AnimatedLeafAccent side="left" />
                <AnimatedLeafAccent side="right" />

                {isLoading ? (
                    <div className="space-y-6">
                        <Skeleton className="h-48 w-full rounded-xl" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Skeleton className="h-32 rounded-xl" />
                            <Skeleton className="h-32 rounded-xl" />
                        </div>
                    </div>
                ) : error ? (
                    <div className="text-center py-12 text-destructive">
                        <p>Failed to load business profile. Please try again.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Main Profile Card */}
                        <Card className="overflow-hidden shadow-card">
                            <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
                            <CardHeader className="pb-2">
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div>
                                        <CardTitle className="text-2xl font-bold font-serif text-foreground">
                                            {profile?.name}
                                        </CardTitle>
                                        <p className="text-muted-foreground mt-1 text-sm">Agricultural Tools & Equipment Dealership</p>
                                    </div>
                                    <Badge className="bg-success/15 text-success border-success/30 border font-semibold px-3 py-1">
                                        <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                                        Verified Business
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground leading-relaxed text-base">
                                    {profile?.description} Roaf Agro Traders is dedicated to providing farmers and agricultural
                                    professionals with high-quality tools, machinery, and equipment to enhance productivity
                                    and efficiency in their operations.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Authorized Dealer Highlight */}
                        <Card className="overflow-hidden shadow-card border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/10">
                            <div className="h-1.5 bg-gradient-to-r from-amber-500 to-amber-700"></div>
                            <CardContent className="p-6">
                                <div className="flex flex-wrap items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-amber-500/15 flex items-center justify-center shrink-0">
                                        <Award className="w-8 h-8 text-amber-700" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-foreground text-xl mb-1">Authorized Dealer of Srachi</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            Roaf Agro Traders is an officially authorized dealer of <span className="font-semibold text-foreground">Srachi</span> products
                                            in <span className="font-semibold text-foreground">Kashmir Province</span>. We guarantee genuine Srachi products with full manufacturer support and warranty.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 bg-amber-600 rounded-xl px-4 py-2 shrink-0">
                                        <CheckCircle className="w-4 h-4 text-white" />
                                        <span className="text-sm font-bold text-white">Srachi – Kashmir Province</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Service Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="shadow-card border-success/20 hover:shadow-card-hover transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
                                            <Truck className="w-6 h-6 text-success" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground text-lg mb-1">Home Delivery Available</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                We deliver agricultural tools and equipment right to your doorstep. Convenient and reliable delivery service across the region.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="shadow-card border-accent/20 hover:shadow-card-hover transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                                            <KeyRound className="w-6 h-6 text-accent-foreground" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground text-lg mb-1">Machines on Rent</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Agricultural machines available on a rental basis. Get the equipment you need without the full purchase cost.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Animated Seedling Sprout Decoration + Certifications */}
                        <div className="relative">
                            {/* Animated seedling accent */}
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <div className="flex-1 h-px bg-border"></div>
                                <div className="flex items-center gap-2">
                                    <img
                                        src="/assets/generated/seedling-sprout.dim_256x256.png"
                                        alt=""
                                        className="w-8 h-8 object-contain opacity-60 animate-grow-in"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                    />
                                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Certifications & Affiliations</span>
                                    <img
                                        src="/assets/generated/seedling-sprout.dim_256x256.png"
                                        alt=""
                                        className="w-8 h-8 object-contain opacity-60 animate-sprout-pulse"
                                        style={{ transform: 'scaleX(-1)' }}
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                    />
                                </div>
                                <div className="flex-1 h-px bg-border"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { icon: ShieldCheck, label: profile?.approvalStatus || 'Approved by Horticultural and Agricultural Department', color: 'text-success', bg: 'bg-success/10' },
                                    { icon: Building2, label: profile?.affiliation || 'Rural Business Service Hub', color: 'text-primary', bg: 'bg-primary/10' },
                                    { icon: Sprout, label: 'Authorized Dealer – Srachi, Kashmir Province', color: 'text-accent-foreground', bg: 'bg-accent/10' },
                                    { icon: MapPin, label: profile?.address || 'Hangulgund Kokernag, near SBI Bank', color: 'text-muted-foreground', bg: 'bg-muted/50' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:shadow-xs transition-shadow">
                                        <div className={`w-9 h-9 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>
                                            <item.icon className={`w-4 h-4 ${item.color}`} />
                                        </div>
                                        <p className="text-sm text-foreground leading-relaxed pt-1">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact */}
                        <Card className="shadow-card">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg font-bold font-serif">Get in Touch</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <a
                                        href={`tel:${profile?.contactNumber || '6006149326'}`}
                                        className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/15 hover:bg-primary/10 transition-colors group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                            <Phone className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Phone</p>
                                            <p className="text-sm font-semibold text-foreground">{profile?.contactNumber || '6006149326'}</p>
                                        </div>
                                    </a>
                                    <a
                                        href="mailto:roafagrotraders@gmail.com"
                                        className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/15 hover:bg-primary/10 transition-colors group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                            <Mail className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Email</p>
                                            <p className="text-sm font-semibold text-foreground">roafagrotraders@gmail.com</p>
                                        </div>
                                    </a>
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/15">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <MapPin className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Address</p>
                                            <p className="text-sm font-semibold text-foreground">{profile?.address || 'Hangulgund Kokernag, near SBI Bank'}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
