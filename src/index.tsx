import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [formState, setFormState] = useState(defaultArticleState);

	const styleSetting = (
		state: typeof defaultArticleState
	): CSSProperties & Record<string, string> => {
		return {
			'--font-family': state.fontFamilyOption.value,
			'--font-size': state.fontSizeOption.value,
			'--font-color': state.fontColor.value,
			'--container-width': state.contentWidth.value,
			'--bg-color': state.backgroundColor.value,
		};
	};

	const [appliedSettings, setAppliedSettings] = useState(
		styleSetting(defaultArticleState)
	);

	const handleChangeForm = (
		key: keyof typeof defaultArticleState,
		selected: OptionType
	) => {
		setFormState((prev) => ({ ...prev, [key]: selected }));
	};

	const handleApplyForm = () => {
		setAppliedSettings(styleSetting(formState));
	};

	const handleResetForm = () => {
		setAppliedSettings(styleSetting(defaultArticleState));
		setFormState(defaultArticleState);
	};

	return (
		<main className={clsx(styles.main)} style={appliedSettings}>
			<ArticleParamsForm
				formState={formState}
				onChangeForm={handleChangeForm}
				onApply={handleApplyForm}
				onReset={handleResetForm}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
