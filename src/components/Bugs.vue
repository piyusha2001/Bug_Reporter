<script setup>
import { computed } from '@vue/reactivity';
import { onMounted, ref, watch } from 'vue';

const bugs = ref([]);
const bug = ref({
	id: Math.floor(Math.random() * 1000) + 1,
	name: '',
	description: '',
	resolved: false,
	bugadded: false,
});

const bugs_ascending = computed(() => {
	return bugs.value.sort((a, b) => {
		return a.name.localeCompare(b.name);
	});
});

const addBug = () => {
	if (bug.value.name === '' || bug.value.description === '') {
		alert('Please fill out the form');
		return;
	} else {
		bugs.value.push(bug.value);
		bug.value = {
			id: Math.floor(Math.random() * 1000) + 1,
			name: '',
			description: '',
			resolved: false,
			bugadded: true,
		};
	}
	console.log('addBug');
};

watch(
	bugs,
	(newVal) => {
		localStorage.setItem('bugs', JSON.stringify(newVal));
	},
	{ deep: true },
);

onMounted(() => {
	if (localStorage.getItem('bugs')) {
		bugs.value = JSON.parse(localStorage.getItem('bugs'));
	} else {
		bugs.value = [];
	}
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
					type="email"
					class="form-control"
					id="exampleFormControlInput1"
					placeholder="Enter Bug Name"
					v-model="bug.name"
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
					v-model="bug.description"
				></textarea>
				<button class="btn btn-dark button" @click="addBug">
					Submit
				</button>
			</div>
		</div>
	</section>

	<section class="bugs-list center_div">
		<div v-if="bug.bugadded">
			<h3 class="title">Bugs Reported</h3>
		</div>
		<div v-else>
			<h3 class="title"></h3>
		</div>
	</section>
</template>

<style scoped>
.center_div {
	margin: 0 auto;
	width: 40%;
}
.form-label {
	font-size: 1.2rem;
	font-weight: bold;
}
.button {
	margin-top: 1rem;
	width: 100%;
}
.bugs-list {
	margin-top: 2rem;
}
.title {
	font-size: 1.5rem;
	font-weight: bold;
	text-align: center;
}
</style>
