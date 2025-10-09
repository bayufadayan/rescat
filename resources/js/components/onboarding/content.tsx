// resources/js/components/onboarding/content.tsx
import * as React from "react";

type Props = {
    title: string;
    description: string;
    animate?: boolean; // kalau true, aktifkan animasi fade+slide
};

export default function Content({ title, description, animate = true }: Props) {
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        if (!animate) return;
        // trigger animasi tiap mount
        const t = requestAnimationFrame(() => setShow(true));
        return () => {
            setShow(false);
            cancelAnimationFrame(t);
        };
    }, [title, description, animate]);

    return (
        <div className={`slide-fade-in ${show ? "show" : ""}`}>
            <h1 className="text-white text-4xl font-extrabold leading-tight tracking-tight">
                {title}
            </h1>
            <p className="mt-2 text-sky-100/90 text-base leading-relaxed">
                {description}
            </p>
        </div>
    );
}
