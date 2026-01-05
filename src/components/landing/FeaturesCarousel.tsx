import React, { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { CloudIcon } from "../../assets/images/featureIcons/CloudIcon";
import type { featureProps } from "../../types/landingTypes";
import { AnalyticsIcon } from "../../assets/images/featureIcons/AnalyticsIcon";
import { LessonsIcon } from "../../assets/images/featureIcons/LessonsIcon";
import { VideoMeetingIcon } from "../../assets/images/featureIcons/VideoMeetingIcon";

const features: featureProps[] = [
    {
        name: "Облако",
        description: "Храните курсы и материалы в одном месте, без забот о бэкапах.",
        icon: CloudIcon,
        backgroundColor: "var(--feature-card-bg-cloud)",
    },
    {
        name: "Аналитика",
        description: "Отслеживайте прогресс и вовлеченность по каждому курсу.",
        icon: AnalyticsIcon,
        backgroundColor: "var(--feature-card-bg-analytics)",
    },
    {
        name: "Уроки",
        description: "Планируйте и публикуйте структурированные уроки и практики.",
        icon: LessonsIcon,
        backgroundColor: "var(--feature-card-bg-lessons)",
    },
    {
        name: "Видеовстречи",
        description: "Создавайте живые созвоны и поддерживайте студентов в реальном времени.",
        icon: VideoMeetingIcon,
        backgroundColor: "var(--feature-card-bg-meetings)",
    },
];

const AUTO_SPEED_PX_PER_SEC = 36;

export default function FeaturesCarousel() {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [repeatCount, setRepeatCount] = useState(3);
    const [offset, setOffset] = useState(0);

    const offsetRef = useRef(0);
    const dragStartRef = useRef(0);
    const lastTimeRef = useRef<number | null>(null);

    const loopedFeatures = useMemo(
        () => Array.from({ length: repeatCount }, () => features).flat(),
        [repeatCount],
    );

    const getBaseWidth = () => {
        const track = trackRef.current;
        if (!track) return 0;
        return track.scrollWidth / Math.max(1, repeatCount);
    };

    const applyOffset = (value: number) => {
        const baseWidth = getBaseWidth();
        if (!baseWidth) return;

        const wrapped = ((value % baseWidth) + baseWidth) % baseWidth;
        offsetRef.current = wrapped;
        setOffset(wrapped);
    };

    useEffect(() => {
        const computeRepeat = () => {
            const track = trackRef.current;
            const firstCard = track?.querySelector<HTMLElement>(".feature");
            const gap = 20;
            const cardWidth = firstCard?.offsetWidth ?? 420;
            const totalCardWidth = cardWidth + gap;

            // Ensure we have enough cards to cover at least 2x viewport to avoid gaps
            const minWidth = window.innerWidth * 2;
            const neededCards = Math.ceil(minWidth / totalCardWidth);
            const repeats = Math.max(3, Math.ceil(neededCards / features.length));
            setRepeatCount(repeats);
        };

        computeRepeat();
        window.addEventListener("resize", computeRepeat);
        return () => window.removeEventListener("resize", computeRepeat);
    }, []);

    useEffect(() => {
        // Adjust offset if repeat count changed
        applyOffset(offsetRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [repeatCount]);

    useEffect(() => {
        let frame: number;
        const step = (ts: number) => {
            if (lastTimeRef.current === null) {
                lastTimeRef.current = ts;
            }
            const delta = ts - lastTimeRef.current;
            lastTimeRef.current = ts;

            if (!isPaused && !isDragging) {
                const move = (AUTO_SPEED_PX_PER_SEC * delta) / 1000;
                applyOffset(offsetRef.current + move);
            }

            frame = requestAnimationFrame(step);
        };

        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, [isPaused, isDragging, repeatCount]);

    const scrollByCard = (direction: -1 | 1) => {
        const track = trackRef.current;
        if (!track) return;

        const firstCard = track.querySelector<HTMLElement>(".feature");
        const gap = 20;
        const cardWidth = firstCard?.offsetWidth ?? 420;
        const step = (cardWidth + gap) * direction;

        applyOffset(offsetRef.current + step);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!trackRef.current) return;
        trackRef.current.setPointerCapture(e.pointerId);
        setIsDragging(true);
        setIsPaused(true);
        dragStartRef.current = e.clientX + offsetRef.current;
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        applyOffset(dragStartRef.current - e.clientX);
    };

    const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!trackRef.current || !isDragging) return;
        if (trackRef.current.hasPointerCapture(e.pointerId)) {
            trackRef.current.releasePointerCapture(e.pointerId);
        }
        setIsDragging(false);
        setIsPaused(false);
    };

    const trackStyle: CSSProperties = {
        transform: `translateX(${-offset}px)`,
    };

    return (
        <section className="features-carousel" id="features" aria-label="Возможности LearnForge">
            <header className="carousel-header">
                <div className="section-kicker">Возможности</div>
                <div className="carousel-title">
                    <h2>Инструменты для онлайн-школы</h2>
                    <p>Мы собрали ключевые возможности — чтобы вы могли быстрее обучать и поддерживать пользователей.</p>
                </div>
            </header>
            <div className="carousel-viewport">
                <div
                    className={`carousel-track ${isDragging ? "dragging" : ""}`}
                    ref={trackRef}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => !isDragging && setIsPaused(false)}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                    style={trackStyle}
                >
                    {loopedFeatures.map((value, index) => (
                        <Feature
                            icon={value.icon}
                            name={value.name}
                            iconSize={80}
                            description={value.description}
                            key={`${value.name}-${index}`}
                            backgroundColor={value.backgroundColor}
                        />
                    ))}
                </div>
                <div className="carousel-fade left" aria-hidden="true" />
                <div className="carousel-fade right" aria-hidden="true" />
            </div>
            <CarouselControls onPrev={() => scrollByCard(-1)} onNext={() => scrollByCard(1)} />
        </section>
    );
}

function Feature({ name, description, icon, iconSize, backgroundColor }: featureProps & { iconSize: number }) {
    const IconComp = icon as React.ComponentType<{ size: number | string; backgroundColor?: string }>;

    return (
        <div className="feature">
            <IconComp size={iconSize} backgroundColor={backgroundColor} />
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    );
}

function CarouselControls({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
    return (
        <div className="carousel-controls">
            <button
                className="carousel-btn carousel-btn-prev"
                type="button"
                aria-label="Перелистнуть назад"
                onClick={onPrev}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>
            <button
                className="carousel-btn carousel-btn-next"
                type="button"
                aria-label="Перелистнуть вперёд"
                onClick={onNext}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>
        </div>
    );
}
