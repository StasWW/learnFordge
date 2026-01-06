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
const STEP_TRANSITION = "transform 320ms cubic-bezier(0.22, 0.61, 0.36, 1)";

export default function FeaturesCarousel() {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [repeatCount, setRepeatCount] = useState(3);
    const [disableTransition, setDisableTransition] = useState(false);
    const [isStepAnimating, setIsStepAnimating] = useState(false);
    const [offset, setOffset] = useState(0);

    const offsetRef = useRef(0);
    const dragStartRef = useRef(0);
    const lastTimeRef = useRef<number | null>(null);
    const stepTimerRef = useRef<number | null>(null);
    const isStepAnimatingRef = useRef(false);

    const loopedFeatures = useMemo(
        () => Array.from({ length: repeatCount }, () => features).flat(),
        [repeatCount],
    );

    const getBaseWidth = () => {
        const track = trackRef.current;
        if (!track) return 0;

        const cards = track.querySelectorAll<HTMLElement>(".feature");
        if (cards.length > features.length) {
            const firstCard = cards[0];
            const nextCycleCard = cards[features.length];
            const measured = nextCycleCard.offsetLeft - firstCard.offsetLeft;
            if (measured > 0) return measured;
        }

        return track.scrollWidth / Math.max(1, repeatCount);
    };

    const runStepAnimation = () => {
        if (stepTimerRef.current) {
            window.clearTimeout(stepTimerRef.current);
        }
        setIsStepAnimating(true);
        isStepAnimatingRef.current = true;
        stepTimerRef.current = window.setTimeout(() => {
            setIsStepAnimating(false);
            isStepAnimatingRef.current = false;
            stepTimerRef.current = null;
        }, 360);
    };

    const applyOffset = (value: number, options?: { skipWrap?: boolean; onWrap?: (shift: number) => void }) => {
        const baseWidth = getBaseWidth();
        if (!baseWidth) return;

        const track = trackRef.current;
        const viewportWidth = track?.parentElement?.clientWidth ?? window.innerWidth;
        const trackWidth = baseWidth * repeatCount;

        let next = value;
        let jumped = false;

        if (!options?.skipWrap) {
            // Keep the virtual scroll inside the middle copies so recentering is invisible.
            const minOffset = baseWidth;
            const maxOffset = Math.max(minOffset, trackWidth - baseWidth - viewportWidth);

            if (next < minOffset) {
                const cyclesToAdd = Math.ceil((minOffset - next) / baseWidth);
                const shift = baseWidth * cyclesToAdd;
                next += shift;
                jumped = true;
                options?.onWrap?.(shift);
            } else if (next > maxOffset) {
                const cyclesToSubtract = Math.ceil((next - maxOffset) / baseWidth);
                const shift = baseWidth * cyclesToSubtract;
                next -= shift;
                jumped = true;
                options?.onWrap?.(-shift);
            }
        }

        if (jumped) {
            setDisableTransition(true);
            requestAnimationFrame(() => setDisableTransition(false));
            if (stepTimerRef.current) {
                window.clearTimeout(stepTimerRef.current);
                stepTimerRef.current = null;
            }
            setIsStepAnimating(false);
            isStepAnimatingRef.current = false;
        }

        offsetRef.current = next;
        setOffset(next);
    };

    useEffect(() => {
        const computeRepeat = () => {
            const track = trackRef.current;
            const firstCard = track?.querySelector<HTMLElement>(".feature");
            const gap = 20;
            const cardWidth = firstCard?.offsetWidth ?? 420;
            const totalCardWidth = cardWidth + gap;
            const baseWidth = features.length * totalCardWidth;
            const viewportWidth = track?.parentElement?.clientWidth ?? window.innerWidth;

            // Keep an extra-wide buffer so animated steps never approach the ends.
            const repeatsForBuffer = Math.ceil((viewportWidth + 5 * baseWidth) / baseWidth);
            const repeats = Math.max(6, repeatsForBuffer);
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
            if (isStepAnimatingRef.current) {
                frame = requestAnimationFrame(step);
                return;
            }

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

        const baseWidth = getBaseWidth();
        if (!baseWidth) return;

        const viewportWidth = track.parentElement?.clientWidth ?? window.innerWidth;
        const trackWidth = baseWidth * repeatCount;
        const minOffset = baseWidth;
        const maxOffset = Math.max(minOffset, trackWidth - baseWidth - viewportWidth);

        // Rebase into the safe middle copy so the animated step never crosses wrap boundaries.
        let current = offsetRef.current;
        let target = current + step;
        const needsRebase = target < minOffset || target > maxOffset;
        if (needsRebase) {
            const middleCycle = Math.floor(repeatCount / 2);
            const middleOffset = baseWidth * middleCycle;
            const relative = ((current - middleOffset) % baseWidth + baseWidth) % baseWidth;
            current = middleOffset + relative;

            if (current > maxOffset) {
                const cyclesBack = Math.ceil((current - maxOffset) / baseWidth);
                current -= baseWidth * cyclesBack;
            } else if (current < minOffset) {
                const cyclesForward = Math.ceil((minOffset - current) / baseWidth);
                current += baseWidth * cyclesForward;
            }

            target = current + step;

            setDisableTransition(true);
            setOffset(current);
            offsetRef.current = current;
            requestAnimationFrame(() => {
                setDisableTransition(false);
                runStepAnimation();
                applyOffset(target, { skipWrap: true });
            });
            return;
        }

        runStepAnimation();
        applyOffset(target, { skipWrap: true });
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
        applyOffset(dragStartRef.current - e.clientX, {
            onWrap: (shift) => {
                dragStartRef.current += shift;
            },
        });
    };

    const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!trackRef.current || !isDragging) return;
        if (trackRef.current.hasPointerCapture(e.pointerId)) {
            trackRef.current.releasePointerCapture(e.pointerId);
        }
        setIsDragging(false);
        setIsPaused(false);
        applyOffset(offsetRef.current);
    };

    const trackStyle: CSSProperties = {
        transform: `translateX(${-offset}px)`,
        transition: disableTransition || isDragging ? "none" : isStepAnimating ? STEP_TRANSITION : "none",
    };

    useEffect(
        () => () => {
            if (stepTimerRef.current) {
                window.clearTimeout(stepTimerRef.current);
            }
        },
        [],
    );

    return (
        <section className="features-carousel" id="features" aria-label="Возможности learnFordge">
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
