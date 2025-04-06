<script lang="ts">
	import HiddenInput from '../HiddenInput.svelte';
	import FileInput from '../FileInput.svelte';
	import AutocompleteSelect from '../AutocompleteSelect.svelte';
	import TextField from '$lib/components/Forms/TextField.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { ModelInfo, CacheLock } from '$lib/utils/types';
	import { m } from '$paraglide/messages';

	interface Props {
		form: SuperValidated<any>;
		model: ModelInfo;
		cacheLocks?: Record<string, CacheLock>;
		formDataCache?: Record<string, any>;
		initialData?: Record<string, any>;
		object?: any;
	}

	let {
		form,
		model,
		cacheLocks = {},
		formDataCache = $bindable({}),
		initialData = {},
		object = {}
	}: Props = $props();
</script>

<HiddenInput {form} field="applied_controls" />
<HiddenInput {form} field="requirement_assessments" />
<FileInput
	{form}
	allowPaste={true}
	helpText={object.attachment
		? `${m.attachmentWarningText()}: ${object.attachment}`
		: m.attachmentHelpText()}
	field="attachment"
	label={m.attachment()}
	allowedExtensions={'*'}
/>
{#if !(initialData.applied_controls || initialData.requirement_assessments)}
	<AutocompleteSelect
		{form}
		optionsEndpoint="folders?content_type=DO&content_type=GL"
		field="folder"
		cacheLock={cacheLocks['folder']}
		bind:cachedValue={formDataCache['folder']}
		label={m.domain()}
		hidden={initialData.applied_controls ||
			initialData.requirement_assessments ||
			initialData.folder}
	/>
{:else}
	<HiddenInput {form} field="folder" />
{/if}
<TextField
	{form}
	field="link"
	label={m.link()}
	helpText={m.linkHelpText()}
	cacheLock={cacheLocks['link']}
	bind:cachedValue={formDataCache['link']}
/>
