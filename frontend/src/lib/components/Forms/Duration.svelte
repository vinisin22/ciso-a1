<script lang="ts">
	import { run } from 'svelte/legacy';

	import { safeTranslate } from '$lib/utils/i18n';
	import type { CacheLock } from '$lib/utils/types';
	import { onMount } from 'svelte';
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms';

	
	interface Props {
		class?: string;
		label?: string | undefined;
		field: string;
		valuePath?: any; // the place where the value is stored in the form. This is useful for nested objects
		helpText?: string | undefined;
		cachedValue: number | undefined;
		cacheLock?: CacheLock;
		form: SuperForm<Record<string, number>>;
		hidden?: boolean;
		disabled?: boolean;
		required?: boolean;
		[key: string]: any
	}

	let {
		class: _class = '',
		label = $bindable(undefined),
		field,
		valuePath = field,
		helpText = undefined,
		cachedValue = $bindable(),
		cacheLock = {
		promise: new Promise((res) => res(null)),
		resolve: (x) => x
	},
		form,
		hidden = false,
		disabled = false,
		required = false,
		...rest
	}: Props = $props();

	label = label ?? field;
	const { value, errors, constraints } = formFieldProxy(form, valuePath);

	interface TimeUnit {
		unit: string;
		secondsMultiplier: number;
		enabled: boolean;
		value: number;
	}

	const _timeUnits: TimeUnit[] = [
		{ unit: 'days', secondsMultiplier: 86400, enabled: false, value: 0 },
		{ unit: 'hours', secondsMultiplier: 3600, enabled: true, value: 0 },
		{ unit: 'minutes', secondsMultiplier: 60, enabled: true, value: 0 },
		{ unit: 'seconds', secondsMultiplier: 1, enabled: true, value: 0 },
		{ unit: 'milliseconds', secondsMultiplier: 0.001, enabled: false, value: 0 }
	];

	function setInitialTimeUnitValues(value: number, units: TimeUnit[]): TimeUnit[] {
		let remainingValue = value;
		units.forEach((timeUnit) => {
			if (timeUnit.enabled) {
				timeUnit.value = Math.floor(remainingValue / timeUnit.secondsMultiplier);
				remainingValue = remainingValue % timeUnit.secondsMultiplier;
			}
		});
		return units;
	}

	const timeUnits = $state(setInitialTimeUnitValues($value || 0, _timeUnits));

	onMount(async () => {
		const cacheResult = await cacheLock.promise;
		if (cacheResult) $value = cacheResult;
	});

	let classesTextField = $derived((errors: string[] | undefined) => (errors ? 'input-error' : ''));
	let classesDisabled = $derived((d: boolean) => (d ? 'opacity-50' : ''));
	run(() => {
		$value = timeUnits.reduce((acc, timeUnit) => {
			return timeUnit.enabled ? acc + timeUnit.value * timeUnit.secondsMultiplier : acc;
		}, 0);
	});
	let cachedValue = $derived($value);
</script>

<div>
	<div class={classesDisabled(disabled)}>
		{#if label !== undefined && !hidden}
			{#if $constraints?.required || required}
				<label class="text-sm font-semibold" for={field}
					>{label} <span class="text-red-500">*</span></label
				>
			{:else}
				<label class="text-sm font-semibold" for={field}>{label}</label>
			{/if}
		{/if}
		{#if $errors}
			<div>
				{#each $errors as error}
					<p class="text-error-500 text-xs font-medium">{error}</p>
				{/each}
			</div>
		{/if}
	</div>
	<div class="control flex flex-row space-x-2">
		{#each timeUnits as timeUnit}
			{#if timeUnit.enabled}
				<div>
					<label class="text-sm" for={field}>{safeTranslate(timeUnit.unit)}</label>
					<input
						type="number"
						class="{'input ' + _class} {classesTextField($errors)}"
						data-testid="form-input-{field.replaceAll('_', '-')}"
						name={field}
						aria-invalid={$errors ? 'true' : undefined}
						placeholder=""
						bind:value={timeUnit.value}
						{disabled}
						{required}
						{...$constraints}
						{...rest}
					/>
				</div>
			{/if}
		{/each}
	</div>
	{#if helpText}
		<p class="text-sm text-gray-500">{helpText}</p>
	{/if}
</div>
