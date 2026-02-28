import { useGetBusinessProfile } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, Building2, Sprout, Award, MapPin, ShieldCheck, Phone } from 'lucide-react';

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
                <div className="relative container mx-auto px-4 text-center">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-primary-foreground/10 mx-auto mb-6 flex items-center justify-center">
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
                    <p className="text-primary-foreground/80 max-w-xl mx-auto">
                        Learn more about Roaf Agro Traders and our commitment to quality agricultural solutions.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
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

                        {/* Contact Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="shadow-card hover:shadow-card-hover transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground mb-1">Address</h3>
                                            <p className="text-sm text-muted-foreground mb-2">Our location</p>
                                            <p className="font-semibold text-primary">{profile?.address || 'Hangulgund Kokernag, near SBI Bank'}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-card hover:shadow-card-hover transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-6 h-6 text-accent-foreground" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground mb-1">Contact Number</h3>
                                            <p className="text-sm text-muted-foreground mb-2">Call us directly</p>
                                            <a
                                                href={`tel:${profile?.contactNumber || '6006149326'}`}
                                                className="font-semibold text-accent-foreground hover:underline"
                                            >
                                                {profile?.contactNumber || '6006149326'}
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Affiliation & Approval */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="shadow-card hover:shadow-card-hover transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Building2 className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground mb-1">Affiliation</h3>
                                            <p className="text-sm text-muted-foreground mb-2">Member of</p>
                                            <p className="font-semibold text-primary">{profile?.affiliation}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-card hover:shadow-card-hover transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                                            <Award className="w-6 h-6 text-accent-foreground" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground mb-1">Approval Status</h3>
                                            <p className="text-sm text-muted-foreground mb-2">Official recognition</p>
                                            <p className="font-semibold text-accent-foreground">{profile?.approvalStatus}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* What We Offer */}
                        <Card className="shadow-card">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold font-serif flex items-center gap-2">
                                    <Sprout className="w-5 h-5 text-primary" />
                                    What We Offer
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { icon: '🚜', title: 'Agricultural Machinery', desc: 'Tractors, tillers, harvesters and more' },
                                        { icon: '🔧', title: 'Hand Tools', desc: 'Quality tools for everyday farming tasks' },
                                        { icon: '💧', title: 'Irrigation Systems', desc: 'Efficient water management solutions' },
                                        { icon: '🌱', title: 'Fertilizers & Inputs', desc: 'Crop nutrition and soil health products' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                                            <span className="text-2xl">{item.icon}</span>
                                            <div>
                                                <div className="font-semibold text-foreground text-sm">{item.title}</div>
                                                <div className="text-xs text-muted-foreground">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Certifications */}
                        <Card className="shadow-card bg-primary/5 border-primary/20">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <ShieldCheck className="w-6 h-6 text-primary" />
                                    <h3 className="font-bold text-foreground text-lg">Certifications & Approvals</h3>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <div className="flex items-center gap-2 bg-card rounded-lg px-4 py-2 border border-border shadow-xs">
                                        <CheckCircle className="w-4 h-4 text-success" />
                                        <span className="text-sm font-medium text-foreground">Rural Business Service Hub</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-card rounded-lg px-4 py-2 border border-border shadow-xs">
                                        <CheckCircle className="w-4 h-4 text-success" />
                                        <span className="text-sm font-medium text-foreground">Horticultural Department Approved</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-card rounded-lg px-4 py-2 border border-border shadow-xs">
                                        <CheckCircle className="w-4 h-4 text-success" />
                                        <span className="text-sm font-medium text-foreground">Agricultural Department Certified</span>
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
