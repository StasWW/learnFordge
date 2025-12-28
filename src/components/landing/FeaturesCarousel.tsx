import React from "react";
import { CloudIcon } from "../../assets/images/featureIcons/CloudIcon";
import type { featureProps } from "../../types/landingTypes.ts";
import {AnalyticsIcon} from "../../assets/images/featureIcons/AnalyticsIcon";
import {LessonsIcon} from "../../assets/images/featureIcons/LessonsIcon";
import {VideoMeetingIcon} from "../../assets/images/featureIcons/VideoMeetingIcon";

const features: featureProps[] = [
	{
		name: 'Облако',
		description: 'Храните все ваши курсы и материалы в облаке, доступные в любое время и с любого устройства.',
		icon: CloudIcon,
		backgroundColor: '#A5DFFF',
	},
	{
		name: 'Аналитика',
		description: 'Отслеживайте прогресс ваших студентов с помощью мощных аналитических инструментов и отчетов.',
		icon: AnalyticsIcon,
		backgroundColor: '#B1FFA4',
	},
	{
		name: 'Уроки',
		description: 'Создавайте интерактивные уроки с видео, тестами и заданиями для повышения вовлеченности студентов.',
		icon: LessonsIcon,
		backgroundColor: '#FFF6A4',
	},
	{
		name: 'Конференции',
		description: 'Созванивайтесь, не покидая сервис. Не требуются ВПН и сторонние приложения.',
		icon: VideoMeetingIcon,
		backgroundColor: '#FFC1EA',
	}
];


export default function FeaturesCarousel() {
	return (
		<>
			<div className="features-carousel">
				<div className="features-carousel">
					{/* Дублирует див для правильного отображения карусели */}
					{[false, true].map((isHidden, idx) => (
						<div className='features-group' aria-hidden={isHidden} key={idx}>
							{features.map((value, index) => (
								<Feature
									icon={value.icon}
									name={value.name}
									iconSize={68}
									description={value.description}
									key={index}
									backgroundColor={value.backgroundColor}
								/>
							))}
						</div>
					))}
				</div>
			</div>
			<CarouselControls />
		</>
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

function CarouselControls() {
	return (
		<div className='features-buttons'>
			<button className='left-button'>&#8592;</button>
			<button className='right-button'>&#8594;</button>
		</div>
	)
}