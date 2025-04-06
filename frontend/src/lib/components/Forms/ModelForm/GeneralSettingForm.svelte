<script lang="ts">
	import Select from '../Select.svelte';
	import NumberField from '../NumberField.svelte';
	import { m } from '$paraglide/messages';
	import type { CacheLock, ModelInfo } from '$lib/utils/types';
	import type { SuperForm } from 'sveltekit-superforms';
	import { Accordion } from '@skeletonlabs/skeleton-svelte';
	import Checkbox from '$lib/components/Forms/Checkbox.svelte';
	interface Props {
		form: SuperForm<any>;
		model: ModelInfo;
		cacheLocks?: Record<string, CacheLock>;
		formDataCache?: Record<string, any>;
	}

	let {
		form,
		model,
		cacheLocks = {},
		formDataCache = $bindable({})
	}: Props = $props();
</script>

<Accordion regionControl="font-bold">
	<Accordion.Item open>
		{#snippet summary()}
				<i class="fa-solid fa-bell mr-2"></i>{m.settingsNotifications()}
			{/snippet}
		{#snippet content()}
			
				<div class="p-4">
					<Checkbox
						{form}
						field="notifications_enable_mailing"
						label={m.settingsNotificationsMail()}
					/>
				</div>
			
			{/snippet}
	</Accordion.Item>
	<Accordion.Item open>
		{#snippet summary()}
			
				<i class="fa-solid fa-asterisk mr-2"></i>{m.settingsInterface()}
			
			{/snippet}
		{#snippet content()}
			
				<div class="p-4">
					<Checkbox
						{form}
						field="interface_agg_scenario_matrix"
						label={m.settingsAggregateMatrix()}
					/>
				</div>
			
			{/snippet}
	</Accordion.Item>
	<Accordion.Item>
		{#snippet summary()}
				<i class="fa-solid fa-gem mr-2"></i>{m.assets()}
			{/snippet}
		{#snippet content()}
			
				<Select
					{form}
					field="security_objective_scale"
					cacheLock={cacheLocks['security_objective_scale']}
					bind:cachedValue={formDataCache['security_objective_scale']}
					options={model.selectOptions['security_objective_scale']}
					helpText={m.securityObjectiveScaleHelpText()}
					label={m.securityObjectiveScale()}
				/>
			
			{/snippet}
	</Accordion.Item>
	<Accordion.Item>
		{#snippet summary()}
				<i class="fa-solid fa-gopuram mr-2"></i>{m.ebiosRadarParameters()}
			{/snippet}
		{#snippet content()}
			
				<NumberField
					{form}
					field="ebios_radar_max"
					label={m.maxRadius()}
					min={6}
					max={16}
					step={0.1}
					cacheLock={cacheLocks['ebios_radar_max']}
					bind:cachedValue={formDataCache['ebios_radar_max']}
				/>
				<NumberField
					{form}
					field="ebios_radar_green_zone_radius"
					label={m.greenZoneRadius()}
					min={0.1}
					max={16}
					step={0.1}
					cacheLock={cacheLocks['ebios_radar_green_zone_radius']}
					bind:cachedValue={formDataCache['ebios_radar_green_zone_radius']}
				/>
				<NumberField
					{form}
					field="ebios_radar_yellow_zone_radius"
					label={m.yellowZoneRadius()}
					min={0.5}
					max={16}
					step={0.1}
					cacheLock={cacheLocks['ebios_radar_yellow_zone_radius']}
					bind:cachedValue={formDataCache['ebios_radar_yellow_zone_radius']}
				/>
				<NumberField
					{form}
					field="ebios_radar_red_zone_radius"
					label={m.redZoneRadius()}
					min={1}
					max={16}
					step={0.1}
					cacheLock={cacheLocks['ebios_radar_red_zone_radius']}
					bind:cachedValue={formDataCache['ebios_radar_red_zone_radius']}
				/>
			
			{/snippet}
	</Accordion.Item>
</Accordion>
