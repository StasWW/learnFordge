import React, { useMemo, useRef, useState } from "react";
import { CloudIcon } from "../../assets/images/featureIcons/CloudIcon";
import type { featureProps } from "../../types/landingTypes";
import {AnalyticsIcon} from "../../assets/images/featureIcons/AnalyticsIcon";
import {LessonsIcon} from "../../assets/images/featureIcons/LessonsIcon";
import {VideoMeetingIcon} from "../../assets/images/featureIcons/VideoMeetingIcon";

const features: featureProps[] = [
	{
		name: 'Облако',
		description: 'Материалы и уроки живут в облаке, доступны на любом устройстве.',
		icon: CloudIcon,
		backgroundColor: 'var(--feature-card-bg-cloud)',
	},
	{
		name: 'Аналитика',
		description: 'Прогресс, тесты и завершение курсов в одном отчёте.',
		icon: AnalyticsIcon,
		backgroundColor: 'var(--feature-card-bg-analytics)',
	},
	{
		name: 'Уроки',
		description: 'Видео, тесты и задания в одном потоке, без лишних вкладок.',
		icon: LessonsIcon,
		backgroundColor: 'var(--feature-card-bg-lessons)',
	},
	{
		name: 'Конференции',
		description: 'Видеозвонки прямо в платформе, запись включена по умолчанию.',
		icon: VideoMeetingIcon,
		backgroundColor: 'var(--feature-card-bg-meetings)',
	}
];


export default function FeaturesCarousel() {
	const trackRef = useRef<HTMLDivElement | null>(null);
	const [isPaused, setIsPaused] = useState(false);

	const loopedFeatures = useMemo(
		() => [...features, ...features], // duplicate for seamless loop
		[],
	);

	const scrollByCard = (direction: -1 | 1) => {
		const track = trackRef.current;
		if (!track) return;
		
		const firstCard = track.querySelector<HTMLElement>(".feature");
		const gap = 20;
		const cardWidth = firstCard?.offsetWidth ?? 420;
		
		// Temporarily pause animation
		setIsPaused(true);
		
		// Get current computed transform
		const computedStyle = window.getComputedStyle(track);
		const matrix = new DOMMatrix(computedStyle.transform);
		const currentX = matrix.m41;
		
		// Apply new position
		track.style.transform = `translateX(${currentX + (cardWidth + gap) * -direction}px)`;
		
		// Resume animation after a short delay
		setTimeout(() => {
			track.style.transform = '';
			setIsPaused(false);
		}, 500);
	};

	return (
		<section className="features-carousel" id="features" aria-label="Ключевые возможности LearnForge">
			<header className="carousel-header">
				<div className="section-kicker">Возможности</div>
				<div className="carousel-title">
					<h2>Инструменты для онлайн-школы</h2>
					<p>От живых созвонов до тестов и облачных материалов — всё в одном пространстве</p>
				</div>
			</header>
			<div className="carousel-viewport">
				<div 
					className={`carousel-track ${isPaused ? 'paused' : ''}`}
					ref={trackRef}
					onMouseEnter={() => setIsPaused(true)}
					onMouseLeave={() => setIsPaused(false)}
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
				aria-label="Предыдущий слайд"
				onClick={onPrev}
			>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
					<polyline points="15 18 9 12 15 6" />
				</svg>
			</button>
			<button 
				className="carousel-btn carousel-btn-next"
				type="button"
				aria-label="Следующий слайд"
				onClick={onNext}
			>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
					<polyline points="9 18 15 12 9 6" />
				</svg>
			</button>
		</div>
	)
}
