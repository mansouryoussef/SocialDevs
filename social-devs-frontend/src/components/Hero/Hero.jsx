import React from 'react';
import './HeroStyles.scss';
import postSvg from '../../assets/img/icons/hero-post.svg';
import heroSvg from '../../assets/img/icons/hero.svg';

export default function Hero() {
	return (
		<div className='hero-container'>
			<img src={postSvg} alt='post svg' className='hero-container__post' />
			<img src={heroSvg} alt='hero svg' className='hero-container__hero' />
		</div>
	);
}
