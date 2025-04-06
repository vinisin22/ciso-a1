<script lang="ts">
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms';
	import type { AnyZodObject } from 'zod';
	import { Segment } from '@skeletonlabs/skeleton-svelte';

	

	interface Props {
		class?: string;
		label?: string | undefined;
		field: string;
		helpText?: string | undefined;
		form: SuperForm<AnyZodObject>;
		[key: string]: any
	}

	let {
		class: _class = 'w-fit',
		label = undefined,
		field,
		helpText = undefined,
		form,
		...rest
	}: Props = $props();

	const { value, errors, constraints } = formFieldProxy(form, field);

	let classesTextField = $derived((errors: string[] | undefined) =>
		errors && errors.length > 0 ? 'input-error' : '');
</script>

<div>
	{#if label !== undefined}
		{#if $constraints?.required}
			<label class="text-sm font-semibold" for={field}
				>{label} <span class="text-red-500">*</span></label
			>
		{:else}
			<label class="text-sm font-semibold" for={field}>{label}</label>
		{/if}
	{/if}
	{#if $errors && $errors.length > 0}
		<div>
			{#each $errors as error}
				<p class="text-error-500 text-xs font-medium">{error}</p>
			{/each}
		</div>
	{/if}
	<div class="control">
		{#each $value.questions as question}
			<li class="flex flex-col justify-between border rounded-xl px-2 pb-2">
				<p class="font-semibold p-2">{question.text}</p>
				{#if question.type === 'unique_choice'}
					<Segment
						class="flex-col"
						active="preset-filled-primary-500"
						hover="hover:preset-tonal-primary"
					>
						{#each question.options as option}
							<Segment.Item
								class="shadow-md"
								bind:group={question.answer}
								name="question"
								value={option}
								on:click={() => (question.answer = question.answer === option ? null : option)}
								>{option}</Segment.Item
							>
						{/each}
					</Segment>
				{:else if question.type === 'date'}
					<input
						type="date"
						placeholder=""
						class="{'input ' + _class} {classesTextField($errors)}"
						bind:value={question.answer}
						{...$constraints}
						{...rest}
					/>
				{:else}
					<input
						type="text"
						placeholder=""
						class="{'input ' + _class} {classesTextField($errors)}"
						bind:value={question.answer}
						{...$constraints}
						{...rest}
					/>
				{/if}
			</li>
		{/each}
	</div>
	{#if helpText}
		<p class="text-sm text-gray-500">{helpText}</p>
	{/if}
</div>
