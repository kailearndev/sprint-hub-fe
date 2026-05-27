import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import { BananaIcon } from "lucide-react"
import { useRef } from "react"
import { BackgroundLogin } from "./components/Background"
import LoginForm from "./components/LoginForm"

export default function Login() {
    const logoRef = useRef<HTMLHeadingElement>(null)
    const cardRef = useRef<HTMLDivElement>(null)
    const strokeRef = useRef<SVGPathElement>(null)
    const task1Ref = useRef<HTMLDivElement>(null)
    const task2Ref = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const path = strokeRef.current

        if (path) {
            const length = path.getTotalLength()

            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
            })
        }

        const floatingCards = [task1Ref.current, task2Ref.current].filter(Boolean)

        const tl = gsap.timeline({
            defaults: {
                ease: 'power3.out',
            },
        })

        tl.from(logoRef.current, {
            y: -150,
            opacity: 0,
            rotate: -18,
            scale: 0.8,
            duration: 0.85,
        })
            .to(
                strokeRef.current,
                {
                    strokeDashoffset: 0,
                    duration: 0.75,
                    ease: 'power2.out',
                },
                '-=0.25',
            )
            .from(
                cardRef.current,
                {
                    y: 48,
                    opacity: 0,
                    scale: 0.96,
                    duration: 0.6,
                },
                '-=0.35',
            )
            .from(
                floatingCards,
                {
                    y: 24,
                    opacity: 0,
                    rotate: 0,
                    stagger: 0.15,
                    duration: 0.55,
                },
                '-=0.45',
            )

        gsap.to(floatingCards, {
            y: -12,
            repeat: -1,
            yoyo: true,
            duration: 2.4,
            ease: 'sine.inOut',
            stagger: 0.35,
        })
    }, [])



    return (
        <section className="relative h-svh overflow-hidden flex items-center justify-center flex-col gap-2 bg-linear-to-br from-primary/10 to-secondary/10 px-4">

            <BackgroundLogin />
            <div
                ref={task1Ref}
                className="pointer-events-none hidden lg:block absolute left-24 top-36 rounded-3xl border border-white/60 bg-white/75 backdrop-blur-xl p-4 shadow-lg rotate-[-8deg]"
            >
                <p className="text-xs text-text-muted">Sprint #12</p>
                <p className="text-sm font-semibold">Design Login UI</p>
            </div>

            <div
                ref={task2Ref}
                className="pointer-events-none hidden lg:block absolute right-24 bottom-36 rounded-3xl border border-white/60 bg-white/75 backdrop-blur-xl p-4 shadow-lg rotate-[6deg]"
            >
                <p className="text-xs text-text-muted">In Progress</p>
                <p className="text-sm font-semibold">Build Dashboard</p>
            </div>

            <div className="relative inline-block mb-4">
                <svg
                    className="absolute -bottom-3 z-10 left-0 w-full h-6"
                    viewBox="0 0 300 40"
                    fill="none"
                >
                    <path
                        ref={strokeRef}
                        d="M10 25 C80 40, 180 0, 290 20"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className="text-primary/80"
                    />
                </svg>

                <h1
                    ref={logoRef}
                    className="group relative z-0 text-4xl font-bold flex items-center gap-2 text-primary justify-center p-2 -rotate-2 rounded-2xl transition-transform duration-300 hover:scale-105"
                >
                    Sprint Hub{' '}
                    <BananaIcon
                        size={40}
                        className="transition-transform duration-300 group-hover:rotate-12"
                    />
                </h1>
            </div>

            <div
                ref={cardRef}
                className="relative z-10 shadow-xl border border-white/60 rounded-4xl flex flex-col gap-6 p-6 w-full max-w-md bg-white/80 backdrop-blur-xl"
            >
                <LoginForm />

                <div className="text-center text-sm text-text-muted border-t pt-4">
                    Don&apos;t have an account?{' '}
                    <a href="#" className="text-primary hover:underline">
                        Sign Up
                    </a>
                </div>
            </div>
        </section>
    )
}
