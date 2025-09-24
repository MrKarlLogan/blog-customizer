import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import clsx from 'clsx';

type FormProps = {
	formState: typeof defaultArticleState;
	onChangeForm: (
		key: keyof typeof defaultArticleState,
		selected: OptionType
	) => void;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = (props: FormProps) => {
	const [open, setOpen] = useState(false);
	const formRef = useRef<HTMLDivElement | null>(null);

	const handleToogleOpen = () => setOpen(!open);

	useEffect(() => {
		const handleOutside = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !formRef.current?.contains(target))
				open && setOpen(false);
		};

		window.addEventListener('mousedown', handleOutside);
		return () => window.removeEventListener('mousedown', handleOutside);
	}, [open]);

	return (
		<div ref={formRef}>
			<ArrowButton isOpen={open} onClick={handleToogleOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: open })}>
				<form
					className={styles.form}
					onSubmit={(event) => {
						event.preventDefault();
						props.onApply();
					}}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={props.formState.fontFamilyOption}
						onChange={(option) =>
							props.onChangeForm('fontFamilyOption', option)
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={props.formState.fontSizeOption}
						name='fontSize'
						onChange={(option) => props.onChangeForm('fontSizeOption', option)}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={props.formState.fontColor}
						onChange={(option) => props.onChangeForm('fontColor', option)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={props.formState.backgroundColor}
						onChange={(option) => props.onChangeForm('backgroundColor', option)}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={props.formState.contentWidth}
						onChange={(option) => props.onChangeForm('contentWidth', option)}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={props.onReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
