import React, {
	useRef,
	useState,
	useEffect,
} from "react";
import styles from "./index.module.less";

interface PreviewProps {
	src: string;
	alt: string;
	handleCloseClick: () => void;
}

export default function Preview(
	props: PreviewProps
) {
	const { src, alt, handleCloseClick } =
		props;
	const imgRef =
		useRef<HTMLImageElement>(null);
	const [scale, setScale] = useState(1);
	const [isLoaded, setIsLoaded] =
		useState(false); // 控制图片加载完成后显示

	const handleWheel = (
		e: React.WheelEvent<HTMLDivElement>
	) => {
		e.preventDefault();
		const scaleAmount = 0.1;
		if (e.deltaY < 0) {
			setScale(prevScale =>
				Math.min(
					prevScale + scaleAmount,
					5
				)
			); // 放大，最大放大到 5 倍
		} else {
			setScale(prevScale =>
				Math.max(
					prevScale - scaleAmount,
					0.1
				)
			); // 缩小，最小缩小到 0.1 倍
		}
	};

	// 禁止页面滚动
	const disableScroll = () => {
		document.body.style.overflow =
			"hidden";
	};

	// 恢复页面滚动
	const enableScroll = () => {
		document.body.style.overflow = "";
	};

	useEffect(() => {
		disableScroll();
		setTimeout(
			() => setIsLoaded(true),
			50
		); // 模拟加载效果
		return () => {
			enableScroll();
		};
	}, []);

	return (
		<>
			<div
				className={`${
					styles.previewOverlay
				} ${
					isLoaded ? styles.loaded : ""
				}`}
				onClick={handleCloseClick}
				onWheel={handleWheel}>
				<div
					className={
						styles.previewContent
					}
					onClick={e =>
						e.stopPropagation()
					}>
					<img
						ref={imgRef}
						src={src}
						alt={alt}
						className={
							styles.previewImage
						}
						style={{
							transform: `scale(${scale})`,
							transformOrigin: "center",
						}}
					/>
				</div>
				<button
					className={styles.closeButton}
					onClick={handleCloseClick}>
					&times;
				</button>
			</div>
		</>
	);
}
