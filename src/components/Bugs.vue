<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

const bugs = ref([]);
const bug = ref({
	name: '',
	description: '',
	resolved: false,
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
			name: '',
			description: '',
			resolved: false,
		};
	}
};
</script>
<template>
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
			<button class="btn btn-dark button" @click="addBug">Submit</button>
		</div>
		<a href="" class="linker">See previously submitted BUGS . </a>
	</div>
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

.linker {
	margin-top: 1rem;
	text-align: center;
	color: #000;
}
</style>
