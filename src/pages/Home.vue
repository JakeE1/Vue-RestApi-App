<template>
    <div class="wrapper-content wrapper-content--fixed">
        <section>
            <div class="container">
                <h1>Hello, this Git Finder</h1>
                <search
                :value="search"
                placeholder="Write to search"
                @search="search = $event"
                 />
                <button v-if="!repos" @click="getRepos" class="btn default"> search </button>
                <button v-else @click="getRepos" class="btn default"> search again </button>

                <div class="errors" v-if="error">
                <p>{{`Error: ${this.error}`}}</p>
                </div> 

                <div class="repos__wrapper" v-if="repos">

                    <!-- profile -->
                    <div class="user-profile">
                        <div class="user-image">    
                            <img :src="profile.avatar_url" alt="avatar">
                        </div>
                        <div class="user-info">
                            <p>Name : {{profile.name}} </p>
                            <p>bio : {{profile.bio}} </p>
                            <p>Public repos : {{profile.public_repos}} </p>
                        </div>
                    </div>


                    <!-- repos -->
                    <div class="repos-item" v-for="repo in repos.slice(0,reposToShow)" :key="repo.id">
                        <div class="repos-info">
                        <a class="link" target="_blank" :href="repo.html_url">{{ repo.name }}</a>
                            <span> {{ repo.stargazers_count }} ⭐</span> 
                        </div> 
                    </div>
                <button v-if="repos.length > reposToShow && reposToShow < repos.length" @click="loadMore" class="btn default"> Load More </button>    
                </div>
            </div>
            
        </section>
    </div>
</template>

<script>
import search from '@/components/Search.vue'
import axios from 'axios'

export default {
    components: {
        search
    },
    data () {
        return {
            search: '',
            repos: null,
            profile: null,
            error: null,
            reposToShow: 4
        }
    },
    methods: {
        getRepos () {
            let one =
            `https://api.github.com/users/${this.search}`
            let two =
            `https://api.github.com/users/${this.search}/repos`

            const requestOne = axios.get(one)
            const requestTwo = axios.get(two)

            axios
                .all([requestOne,requestTwo])
                .then(
                    axios.spread((...responses) => {
                        const responseOne = responses[0];
                        const responseTwo = responses[1];

                        this.repos = responseTwo.data
                        this.profile = responseOne.data
                        console.log(responseOne);
                    })
                )
                .catch(err => {
                    this.repos = null
                    this.error = 'Can\'t find this user'
                })
            this.reposToShow = 4    
        },
        loadMore ()  {
            this.reposToShow *= 2
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    align-items: center;
    flex-direction: column;
}
h1 {
 margin-bottom: 20px;
}
button {
    margin: 40px 0;
}
.repos__wrapper {
    width: 600px;
    margin: 30px 0;
    button {
        display: block;
        margin: 40px auto;
    }
}
.user-profile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px 0;
    
}
.user-image  {
    width: 200px;
    height: 200px;
    border-style: solid;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 0 0;
    }
}
.repos-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px 0;
    border-bottom: 1px solid black;
}
</style>
    
