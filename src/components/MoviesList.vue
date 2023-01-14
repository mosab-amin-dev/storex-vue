<template>
    <br/>
    <div class="list row">
      <div class="col-md-4">
        <h4>Movies List</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(movie, index) in movies"
            :key="index"
            @click="setActiveMovie(movie, index)"
          >
            {{ movie.name }}
          </li>
        </ul>
      </div>
      <div class="col-md-8 " >
      <div class="view">
      <div class="row" v-if="currentMovie">
        <div class="col-md-8 " >
          <h4>Movie</h4>
          <div v-if="!editing">
          
          <div>
            <label><strong>Name:</strong></label> {{ currentMovie.name }}
          </div>
           <div>
            <label><strong>Description:</strong></label> {{ currentMovie.description }}
            </div>
          <br/>
          <a class="btn btn-info" @click="editMove()" >Edit</a>  <a class="btn btn-danger" @click="deleteMove(currentMovie.id)">Delete</a>
        </div>
          <div class="submit-form" v-if="editing">
            <div>
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control"
                v-model="currentMovie.name"
                name="name"
                v-on:change="updateTitle"
                />
               </div>
               <div class="form-group">
                <label for="description">Description</label>
                  <textarea
                  class="form-control"
                  id="description"
                  required
                  v-model="currentMovie.description"
                  name="description"
                  rows="5"
                  v-on:change="updateDes">
                </textarea>
              </div>
              <div class="form-group">
                <label for="category_id">Category </label>
                <select v-model="currentMovie.category_id" class="form-control" v-on:change="updateCat">
                  <option value=0 selected>select category</option>
                  <option v-for="(category, index) in categories" :value="category.id" :key="index">
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                 <label for="image">Image</label>
                 <input type="file" id="image" name="image" v-on:change="uploadImage">
                </div>
                <button @click="updateMovie" class="btn btn-info">Update</button></div>
              </div>
            </div>
            <div class="col-md-4" >
              <img v-bind:src="imageFullPath" v-bind:width="250"/>
            </div>
          </div>
          <div v-else>
            <br />
            <p>Please click on a Movie...</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import MovieDataService from "../services/MovieDataService";
  import {baseURL}  from "../http-common"
  
  export default {
    name: "movies-list",
    data() {
      return {
        movies: [],
        currentMovie: null,
        currentIndex: -1,
        name: "",
        imageFullPath:'',
        editing:false,
        categories:null
      };
    },
    methods: {
      retrieveMovies() {
        MovieDataService.getAll()
          .then(response => {
            this.movies = response.data.message;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      getCategories(){
        MovieDataService.getCategories().then((categories) => {
            this.categories = categories.data.message;
            console.log(this.categories)
           });
        },
      
      deleteMove(id){
        MovieDataService.delete(id).then(response => {
            this.movies = response.data.message;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
          this.refreshList();
      },
      editMove(){
        this.editing=true;
      },
      updateMovie(){
        let data = {
        name: this.currentMovie.name,
        description: this.currentMovie.description,
        category_id: this.currentMovie.category_id,
        image      : this.currentMovie.image
      };
      MovieDataService.update(this.currentMovie.id,data)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
      },
      uploadImage(e){
      this.currentMovie.image=e.target.files[0]
      },
      updateTitle(e){
      this.currentMovie.name=e.target.value;
      console.log(this.currentMovie.name);
      },
      updateDes(e){
      this.currentMovie.description=e.target.value
      },
      updateCat(e){
      this.currentMovie.category_id=e.target.value
      },

      refreshList() {
        this.retrieveMovies();
        this.currentMovie = null;
        this.currentIndex = -1;
        this.editing=false;
      },
  
      setActiveMovie(movie, index) {
        this.currentMovie = movie;
        this.currentIndex = movie ? index : -1;
        this.imageFullPath=baseURL+movie.image;
      }
    },
    mounted() {
      this.retrieveMovies();
      this.getCategories();
    }
  };
  </script>
  <style>
  .list {
    text-align: left;
    max-width: 1200px;
    margin: auto;
    padding-right: 150px;
  }
  .view{
    position: sticky;
    top:80px;
  }
  </style>