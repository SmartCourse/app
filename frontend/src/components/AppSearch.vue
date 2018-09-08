<template>
    <div class="search">
        <input 
            type='text' 
            v-model='search' 
            name='search' 
            placeholder='Search...'
        />
        <ul v-if="search && suggestions.length">
            <router-link 
                :key="item.id"
                tag="li" 
                v-for="item in suggestions"
                :to="{ path: `/course/${item.id}`}"
            >
                {{ item.name }} ({{ item.code }})
            </router-link>
        </ul>
    </div>
</template>


<script>
export default {
    data() {
        return {
            search: '',
            courses: []
        }
    },

    computed: {
        suggestions() {
            return this.courses
                .filter(item => item.name.match(this.search) || item.code.match(this.search))
                .slice(0, 5)
        }
    },

    created() {
        fetch('course-names.json')
            .then(response => response.json())
            .then(data => {
                this.courses = data.map((name, id) => ({
                    id,
                    name: name.split(' - ')[1],
                    code: name.split(' - ')[0]
                }))
            })
    }
}
</script>

<style scoped>

.search {
    position: relative;
    font-size: 0.8em;
    margin: 20px auto;
}

input {
    margin: auto;
    outline: none;
    font: inherit;
    width: 500px;
}

ul, input {
    border-radius: 0.2em;
    border: var(--border);
}

input, li {
    padding: 10px 20px;
}

ul {
    width: 540px;
    position: absolute;
    max-height: 200px;
    overflow-y: scroll;
}

li {
    font-size: 0.55em;
}

li:hover {
    background: var(--theme-light);
}

@media screen and (max-width: 400px) {
    ul {
        width: 350px;
    }

    input {
        width: 310px;
    }
    
}


</style>


