<template>
	<div class="row">
		<div class="col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1">
			<form id="login-form" role="form" style="display: block;">
				<h3 class="text-center">Login</h3>
				  	<div class="form-group">
				          <input type="email" name="email" id="email" 
				          class="form-control" placeholder="Email Address"
				          v-model="email">
		        	</div>
				<div class="form-group">
					<input type="password" name="password" id="password" 
					class="form-control" placeholder="Password"
					v-model="password">
				</div>

				<div class="form-group">
					<button class="btn btn-success" style="width: 100%" @click.prevent="loginWithEmailLocal">
						Log in
					</button>
				</div>
				<div class="form-group">
					<button class="btn btn-success" style="width: 100%" @click.prevent="loginWithGoogle">
						Log in with Google
					</button>
				</div>
				<div class="form-group">
					<div class="row">
						<div class="col-lg-12">
							<div class="text-center">
								<router-link to="/register"><a>Register</a></router-link>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
  import { mapActions } from 'vuex';
  import firebase from 'firebase';
  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
       ...mapActions(['addMessage', 'clearMessage']),
      loginWithGoogle() {
      	var self = this;
      	var provider = new firebase.auth.GoogleAuthProvider();
      	firebase.auth().signInWithPopup(provider).then(function(result) {
		  // This gives you a Google Access Token. You can use it to access the Google API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;
		  //console.log(user);
          self.clearMessage();
	      self.$router.push({name: 'mainpage'});
		  // ...
		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
		  // ...
		});
      },
      loginWithEmailLocal() {
        let data = {
          email: this.email,
          password: this.password
        }
        // this.loginWithEmail(data);
        this.$store.dispatch('loginWithEmail', data).then((user) => {
        	// console.log(user);
        	this.clearMessage();
        	this.$router.push({name: 'mainpage'});
        }).catch((error) => {
			console.log('register error', error);
			let message_obj = {
			  message: error.message,
			  messageClass: "danger",
			  autoClose: true
			}
			this.addMessage(message_obj);
		});
      }
    }
  }
</script>