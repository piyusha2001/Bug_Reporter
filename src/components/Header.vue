<template>
	<div class="head">
		<h1 class="title">
			<i class="fa-solid fa-bug"></i>
			{{ title }}
		</h1>
		<p class="about">{{ about }}</p>
	</div>
</template>

<script>
export default {
	name: 'Header',
	props: {
		title: {
			type: String,
			required: true,
		},
		about: {
			type: String,
			required: true,
		},
	},
};
</script>

<style scoped>
.head {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 2.5rem;
	margin: auto;
}
.title {
	font-family: 'Poppins', sans-serif;
	font-size: 2.5rem;
	color: #052d41;
	font-weight: bold;
}
.about {
	font-size: 1.2rem;
	padding: 1rem 0;

	text-align: center;
	color: #052d41;
}
</style>
