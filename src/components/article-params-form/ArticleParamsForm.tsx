import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
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

export const ArticleParamsForm = () => {
	const [open, setOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);

	const handleClickOpen = () => setOpen(!open);
	const handleChangeForm = (
		key: keyof typeof formState,
		selected: OptionType
	) => {
		setFormState((prev) => ({ ...prev, [key]: selected }));
	};

	return (
		<>
			<ArrowButton isOpen={open} onClick={handleClickOpen} />
			<aside className={`${styles.container} ${open && styles.container_open}`}>
				<form className={styles.form}>
					<h2 className={styles.form_title}>Задайте параметры</h2>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option) => handleChangeForm('fontFamilyOption', option)}
					/>
					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						name='fontSize'
						onChange={(option) => handleChangeForm('fontSizeOption', option)}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) => handleChangeForm('fontColor', option)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) => handleChangeForm('backgroundColor', option)}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) => handleChangeForm('contentWidth', option)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
