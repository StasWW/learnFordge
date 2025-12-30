import React, { useEffect, useRef } from "react";
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
		backgroundColor: 'rgba(124, 247, 210, 0.14)',
	},
	{
		name: 'Аналитика',
		description: 'Прогресс, тесты и завершение курсов в одном отчёте.',
		icon: AnalyticsIcon,
		backgroundColor: 'rgba(108, 186, 255, 0.14)',
	},
	{
		name: 'Уроки',
		description: 'Видео, тесты и задания в одном потоке, без лишних вкладок.',
		icon: LessonsIcon,
		backgroundColor: 'rgba(199, 243, 109, 0.16)',
	},
	{
		name: 'Конференции',
		description: 'Видеозвонки прямо в платформе, запись включена по умолчанию.',
		icon: VideoMeetingIcon,
		backgroundColor: 'rgba(255, 201, 125, 0.16)',
	}
];


export default function FeaturesCarousel() {
	const viewportRef = useRef<HTMLDivElement | null>(null);

	const scrollByCard = (direction: -1 | 1) => {
		const viewport = viewportRef.current;
		if (!viewport) return;
		const firstCard = viewport.querySelector<HTMLElement>(".feature");
		const gap = 16; // соответствует gap в стилях
		const cardWidth = firstCard?.offsetWidth ?? viewport.clientWidth;
		viewport.scrollBy({ left: (cardWidth + gap) * direction, behavior: "smooth" });
	};

	useEffect(() => {
		const viewport = viewportRef.current;
		if (!viewport) return;
		const interval = window.setInterval(() => {
			const firstCard = viewport.querySelector<HTMLElement>(".feature");
			const gap = 16;
			const cardWidth = firstCard?.offsetWidth ?? viewport.clientWidth;
			const step = cardWidth + gap;
			const maxScroll = viewport.scrollWidth - viewport.clientWidth;
			const nextLeft = viewport.scrollLeft + step;

			if (nextLeft >= maxScroll - 1) {
				viewport.scrollTo({ left: 0, behavior: "smooth" });
			} else {
				viewport.scrollBy({ left: step, behavior: "smooth" });
			}
		}, 4000);

		return () => window.clearInterval(interval);
	}, []);

	return (
		<section className="features-carousel" aria-label="Ключевые возможности LearnForge">
			<header className="carousel-header">
				<div className="section-kicker">Возможности</div>
				<div className="carousel-title">
					<h2>Инструменты для онлайн-школы</h2>
					<p>От живых созвонов до тестов и облачных материалов — всё в одном пространстве</p>
				</div>
			</header>
			<div className="carousel-viewport" ref={viewportRef}>
				<div className="carousel-track">
					{features.map((value, index) => (
						<Feature
							icon={value.icon}
							name={value.name}
							iconSize={72}
							description={value.description}
							key={index}
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
