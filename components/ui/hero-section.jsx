import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export function HeroSection() {
  const { user } = useAuth();
  const router = useRouter();

  const handleFindStudents = () => {
    if (user) {
      router.push('/users');
    } else {
      router.push('/login?redirect=/users');
    }
  };

  const handleSkillShoutout = () => {
    if (user) {
      router.push('/shoutout');
    } else {
      router.push('/login?redirect=/shoutout');
    }
  };

  return (
    <>
      <main className="overflow-hidden">
        <div
          aria-hidden
          className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block"
        >
          <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>
        <section>
          <div className="relative pt-8 md:pt-12">
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      delayChildren: 1,
                    },
                  },
                },
                item: {
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      bounce: 0.3,
                      duration: 2,
                    },
                  },
                },
              }}
              className="absolute inset-0 -z-20"
            >
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
                alt="background"
                className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block"
                width="3276"
                height="4095"
              />
            </AnimatedGroup>
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
            />
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <h1 className="mt-8 max-w-4xl mx-auto text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]">
                    Connect With Skilled Students
                  </h1>
                  <p className="mx-auto mt-8 max-w-2xl text-balance text-lg">
                    Find peers with complementary skills for your next project.
                    Exchange knowledge and collaborate with fellow students to
                    achieve mutual success.
                  </p>
                </AnimatedGroup>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  <div
                    key={1}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/80 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <Button
                      size="lg"
                      className="relative rounded-lg px-8 py-6 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white border-2 border-white/20 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105"
                      onClick={handleFindStudents}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-nowrap">Find Students</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </div>
                    </Button>
                  </div>
                  <Button
                    key={2}
                    size="lg"
                    variant="ghost"
                    className="h-10.5 rounded-xl px-5 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:bg-primary/5"
                    onClick={handleSkillShoutout}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-nowrap">Post a Skill Shoutout</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-megaphone"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
                    </div>
                  </Button>
                </AnimatedGroup>
              </div>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                <div
                  aria-hidden
                  className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                />
                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                  <img
                    className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block"
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                    alt="students collaborating"
                    width="2700"
                    height="1440"
                  />
                  <img
                    className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border dark:hidden"
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="students collaborating"
                    width="2700"
                    height="1440"
                  />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Why Choose SkillSync?
              </h2>
              <p className="mt-4 text-lg text-foreground/60">
                Connect, collaborate, and grow with fellow students
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatedGroup
                variants={transitionVariants}
                className="group relative overflow-hidden rounded-2xl border bg-card p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Find Your Team</h3>
                  <p className="text-foreground/60">Connect with students who have complementary skills for your next project.</p>
                </div>
              </AnimatedGroup>

              <AnimatedGroup
                variants={transitionVariants}
                className="group relative overflow-hidden rounded-2xl border bg-card p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2 .5 3"/><path d="M9 18h6"/><path d="M10 22h4"/><path d="m2 2 20 20"/></svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Learn & Grow</h3>
                  <p className="text-foreground/60">Exchange knowledge and learn new skills from your peers.</p>
                </div>
              </AnimatedGroup>

              <AnimatedGroup
                variants={transitionVariants}
                className="group relative overflow-hidden rounded-2xl border bg-card p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Build Projects</h3>
                  <p className="text-foreground/60">Collaborate on exciting projects and build your portfolio together.</p>
                </div>
              </AnimatedGroup>
            </div>
          </div>
        </section>
        <section className="py-24 bg-background/50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <AnimatedGroup variants={transitionVariants} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-foreground/60">Active Students</div>
              </AnimatedGroup>
              <AnimatedGroup variants={transitionVariants} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-foreground/60">Projects Created</div>
              </AnimatedGroup>
              <AnimatedGroup variants={transitionVariants} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-foreground/60">Skills Shared</div>
              </AnimatedGroup>
              <AnimatedGroup variants={transitionVariants} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-foreground/60">Success Rate</div>
              </AnimatedGroup>
            </div>
          </div>
        </section>
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                What Our Users Say
              </h2>
              <p className="text-foreground/60">
                Hear from students who found their perfect team
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <AnimatedGroup
                variants={transitionVariants}
                className="group relative overflow-hidden rounded-2xl border bg-card p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    AS
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold">Alex Smith</div>
                    <div className="text-sm text-foreground/60">Computer Science</div>
                  </div>
                </div>
                <p className="text-foreground/60">
                  "SkillSync helped me find the perfect team for my final year project. The collaboration was seamless!"
                </p>
              </AnimatedGroup>

              <AnimatedGroup
                variants={transitionVariants}
                className="group relative overflow-hidden rounded-2xl border bg-card p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    MJ
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold">Maria Johnson</div>
                    <div className="text-sm text-foreground/60">Data Science</div>
                  </div>
                </div>
                <p className="text-foreground/60">
                  "I learned so much from my peers on SkillSync. The platform made it easy to connect with like-minded students."
                </p>
              </AnimatedGroup>

              <AnimatedGroup
                variants={transitionVariants}
                className="group relative overflow-hidden rounded-2xl border bg-card p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    RK
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold">Ryan Kumar</div>
                    <div className="text-sm text-foreground/60">Web Development</div>
                  </div>
                </div>
                <p className="text-foreground/60">
                  "The projects I've built through SkillSync have been great additions to my portfolio. Highly recommended!"
                </p>
              </AnimatedGroup>
            </div>
          </div>
        </section>
        <footer className="bg-background border-t border-border/40">
          <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
            <div className="flex justify-center space-x-6 md:order-2">
              <Link href="/about" className="text-foreground/60 hover:text-foreground">
                About
              </Link>
              <Link href="/help" className="text-foreground/60 hover:text-foreground">
                Help
              </Link>
              <Link href="/projects" className="text-foreground/60 hover:text-foreground">
                Projects
              </Link>
            </div>
            <div className="mt-8 md:order-1 md:mt-0">
              <p className="text-center text-sm leading-5 text-foreground/60">
                &copy; {new Date().getFullYear()} SkillSync. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
