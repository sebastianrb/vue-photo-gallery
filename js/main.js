//components

Vue.component("info-card", {
    template: `
        <div class="info-card" v-bind:class="{'show-card': showCard}">
            <button class="info-card__close" @click="toggleInfoCard"><i class="fa fa-caret-right" aria-hidden="true"></i></button>
            <slot></slot>
        </div>
    `,

    methods: {
        toggleInfoCard() {
            this.showCard = !this.showCard;
        }
    },

    data() {
        return {
            "showCard": true
        }
    }
})

Vue.component("gallery-container", {
    template: "<section class='gallery-container'><slot></slot></section>",

    data() {
        return {

        }
    }
})

//root view instance
new Vue({

    el: "#root",

    data: {

        images: [
        {
            name: "Rocks",
            src: "./images/photo-portfolio-rock.jpg",
            selected: true,
            next: false,
            previous: false,
            location: "Carbondale, CO",
            date: "2006"
        },
        {
            name: "Lightning",
            src: "./images/photo-portfolio-lightning.jpg",
            selected: false,
            next: true,
            previous: false,
            location: "Carbondale, CO",
            date: "2006"
        },
        {
            name: "Mountains",
            src: "./images/photo-portfolio-mountains.jpg",
            selected: false,
            next: false,
            previous: false,
            location: "Aspen, CO",
            date: "2007"
        },
        {
            name: "Tree",
            src: "./images/photo-portfolio-tree.jpg",
            selected: false,
            next: false,
            previous: false,
            location: "Carbondale, CO",
            date: "2006"
        },
        {
            name: "House",
            src: "./images/photo-portfolio-house.jpg",
            selected: false,
            next: false,
            previous: true,
            location: "Carbondale, CO",
            date: "2007"
        }
        ],

        selectedPhotoID: "",
        nextID: "",
        previousID: ""
    },

    methods: {
        setNextAndPreviousID: function() {
            this.images.forEach( (image, index) => {
                if(image.next === true) {
                    this.nextID = index;
                } else if(image.previous === true) {
                    this.previousID = index;
                }
            });
        },

        setSelectedID: function() {
            this.images.forEach( (image, index) => {
                if(image.selected === true) {
                    this.selectedPhotoID = index;
                }
            });
        },

        nextPhoto: function() {
            //change selection to next
            //if we're at end, go back to beginning; else, increment selected ID
            if(this.selectedPhotoID === this.images.length - 1) {
                this.selectedPhotoID = 0;
            } else {
                this.selectedPhotoID++;
            }

            //change next and previous photos
            if(this.nextID === this.images.length - 1) {
                this.nextID = 0;
            } else {
                this.nextID++;
            }

            if(this.previousID === this.images.length - 1) {
                this.previousID = 0;
            } else {
                this.previousID++;
            }

            this.updateSelectedPhoto();
            this.setNextAndPreviousID();
        },

        previousPhoto: function() {
            //change selection to previous
            if(this.selectedPhotoID === 0) {
                this.selectedPhotoID = this.images.length - 1;
            } else {
                this.selectedPhotoID--;
            }

            //change next and previous photos
            if(this.nextID === 0) {
                this.nextID = this.images.length - 1;
            } else {
                this.nextID--;
            }

            if(this.previousID === 0) {
                this.previousID = this.images.length - 1;
            } else {
                this.previousID--;
            }

            this.updateSelectedPhoto();
            this.setNextAndPreviousID();

        },

        updateSelectedPhoto: function() {
            //set selected image based on new ID
            this.images.forEach((element, index) => {
                element.selected = (index === this.selectedPhotoID);
                element.next = (index === this.nextID);
                element.previous = (index === this.previousID);
            });
        }
    },

    mounted() {
        this.setSelectedID();
        this.setNextAndPreviousID();
    }
})

//fade title container on scroll
new Vue({
    el: "#title-container",

    data: {
        titleFaded: false
    },

    created() {
        //scroll event listener
        window.addEventListener("scroll", (event) => {
          if(window.innerWidth < 851) {
             if (document.body.scrollTop > 60) {
                this.titleFaded = true;
             } else {
                this.titleFaded = false;
             }
          }
        });
    }
})


