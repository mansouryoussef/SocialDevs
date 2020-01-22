import React from 'react';
import Styles from './Hero.module.scss';

import postSvg from 'assets/img/icons/hero-post.svg';
import heroSvg from 'assets/img/icons/hero.svg';

export default function Hero() {
	return (
		<div className={Styles.heroContainer}>
			<img src={postSvg} alt='post svg' className={Styles.singlePostImg} />
			<img src={heroSvg} alt='hero svg' className={Styles.heroImg} />
		</div>
	);
}
