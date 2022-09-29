<script setup>
import { computed } from '@vue/reactivity';

import { onMounted, ref, watch } from 'vue';

const bugs = ref([]);
const bugName = ref('');
const bugDescription = ref('');

const bugs_ascending = computed(() => {
	return bugs.value.sort((a, b) => {
		return a.createdAt - b.createdAt;
	});
});

watch(
	bugs,
	(newVal) => {
		localStorage.setItem('bugs', JSON.stringify(newVal));
	},
	{ deep: true },
);

const addBug = () => {
	if (bugName.value === '' || bugDescription.value === '') {
		alert('Please fill out the form');
		return;
	} else {
		bugs.value.push({
			id: Math.floor(Math.random() * 1000) + 1,
			name: bugName.value,
			description: bugDescription.value,
			resolved: false,
			bugadded: true,
			createdAt: new Date().getTime(),
		});
	}
};
const removeBug = (bug) => {
	bugs.value = bugs.value.filter((t) => t !== bug);
};
onMounted(() => {
	bugs.value = JSON.parse(localStorage.getItem('bugs')) || [];
});
</script>
<template>
	<section class="bugsform">
		<div class="bugdescription center_div">
			<div class="mb-3">
				<label for="exampleFormControlInput1" class="form-label"
					>Bug Name :</label
				>
				<input
					type="text"
					class="form-control"
					id="exampleFormControlInput1"
					placeholder="Enter Bug Name"
					v-model="bugName"
				/>
			</div>
			<div class="mb-3">
				<label for="exampleFormControlTextarea1" class="form-label"
					>Bug Description :</label
				>
				<textarea
					class="form-control"
					id="exampleFormControlTextarea1"
					rows="3"
					placeholder="Enter Bug Description"
					v-model="bugDescription"
				></textarea>
				<button
					id="submitbutton"
					class="btn btn-dark button"
					@click="addBug"
				>
					Submit
				</button>
			</div>
		</div>
	</section>

	<section class="bugs-list center_div">
		<div v-if="bugs.length != 0">
			<h5>Mark resolved if the bug is solved --></h5>
			<div class="list">
				<div
					v-for="bug in bugs_ascending"
					:class="`bug-item-${
						bug.resolved ? 'resolved' : 'unresolved'
					}`"
				>
					<div class="bug-item-details">
						<div class="bug-item__name">
							<p>BUG NAME :- {{ bug.name }}</p>
						</div>
						<div class="bug-item__description">
							<p>BUG DESCRIPTION :- {{ bug.description }}</p>
						</div>
					</div>

					<div>
						<button
							id="resolvebutton"
							class="btn btn-dark button"
							@click="bug.resolved = !bug.resolved"
						>
							{{ bug.resolved ? 'unresolved' : 'resolved' }}
						</button>
						<button
							id="deletebutton"
							@click="removeBug(bug)"
							class="btn btn-dark button"
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<h3 class="title"></h3>
		</div>
	</section>
</template>
