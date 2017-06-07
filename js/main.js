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
            "showCard": false
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
            name: "House",
            src: "./images/photo-portfolio-house.jpg",
            selected: true,
            next: false,
            previous: false,
            location: "Carbondale, CO",
            camera: "Canon Rebel XT"
        },
        {
            name: "Lightning",
            src: "./images/photo-portfolio-lightning.jpg",
            selected: false,
            next: true,
            previous: false,
            location: "Carbondale, CO",
            camera: "Canon Rebel XT"
        },
        {
            name: "Mountains",
            src: "./images/photo-portfolio-mountains.jpg",
            selected: false,
            next: false,
            previous: false,
            location: "Aspen, CO",
            camera: "Canon Rebel XT"
        },
        {
            name: "Tree",
            src: "./images/photo-portfolio-tree.jpg",
            selected: false,
            next: false,
            previous: false,
            location: "Carbondale, CO",
            camera: "Canon Rebel XT"
        },
        {
            name: "Rocks in a River",
            src: "http://dummyimage.com/800x600/4d494d/686a82.gif&text=placeholder+image",
            selected: false,
            next: false,
            previous: true,
            location: "Carbondale, CO",
            camera: "Canon Rebel XT"
        }
        ],

        selectedPhotoID: "",
        infoCardArray: []
    },

    methods: {
        setSelectedID: function() {
            this.images.forEach( (image, index) => {
                if(image.selected === true) {
                    this.selectedPhotoID = index;
                }
            });
        },

        nextPhoto: function() {
            console.log("clicked");
            //change selection to next
            //if we're at end, go back to beginning; else, increment selected ID
            if(this.selectedPhotoID === this.images.length - 1) {
                this.selectedPhotoID = 0;
            } else {
                this.selectedPhotoID++;
            }

            this.updateSelectedPhoto();
        },

        previousPhoto: function() {
            console.log("clicked");
            //change selection to previous
            if(this.selectedPhotoID === 0) {
                this.selectedPhotoID = this.images.length - 1;
            } else {
                this.selectedPhotoID--;
            }

            this.updateSelectedPhoto();

        },

        updateSelectedPhoto: function() {
            //set selected image based on new ID
            this.images.forEach((element, index) => {
                element.selected = (index === this.selectedPhotoID);
            });
        }
    },

    mounted() {
        this.setSelectedID();
    }
})


