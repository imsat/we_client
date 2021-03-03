<template>
  <v-col cols="12">
    <v-card
    >
      <v-card-title class="headline ">
        All Products
        <v-spacer></v-spacer>
        <v-btn
            color="cyan"
            small
            dark
            @click.stop="SET_IS_ACTIVE({modal: true, name: 'add-new-product'})"
        >
          <v-icon>mdi-plus</v-icon>
          Add New
        </v-btn>
      </v-card-title>

      <v-card-text>

        <v-data-table
            :headers="headers"
            :items="products"
            @pagination="getProducts({event: $event})"
            :server-items-length="totalProducts"
            :loading="isLoading"
            class="elevation-1"
            :footer-props="{
            itemsPerPageText: 'Products Per Page',
            itemsPerPageOptions: [10, 25, 50, 100],
            showCurrentPage: true,
            showFirstLastPage: true
          }"
        >
          <!-- SL -->
          <template v-slot:item.identifier="{ item }">{{
              products.map(function (product) {
                return product.identifier;
              }).indexOf(item.identifier) + 1
            }}
          </template>

          <!-- Title -->
          <template v-slot:item.product_title="{ item }">
            <!-- Inline level -->
            <span
                class="d-inline-block text-truncate"
                style="max-width: 250px;"
            >
              {{ item.product_title }}
           </span>
          </template>

          <!-- SL -->
          <template v-slot:item.product_image_path="{ item }">
            <v-img
                :lazy-src="item.product_image_path"
                max-height="80"
                max-width="80"
                :eager="true"
                :src="item.product_image_path"
            ></v-img>
          </template>

          <!-- Description -->
          <template v-slot:item.product_details="{ item }">
            <!-- Inline level -->
            <span
                class="d-inline-block text-truncate"
                style="max-width: 200px;"
            >
              {{ item.product_details }}
           </span>
          </template>

          <!-- Action -->
          <template v-slot:item.Action="{ item }">

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn class="mr-1" v-on="on" color="info" fab x-small
                       @click="SET_VIEW_PRODUCT_FOR_VIEW(item), SET_IS_ACTIVE({modal: true, name: 'view-product-drawer'})">
                  <v-icon small>mdi-eye</v-icon>
                </v-btn>
              </template>
              <span>View</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn class="mr-1" v-on="on" color="success" fab x-small
                       @click="SET_EDIT_PRODUCT_FOR_EDIT(item), SET_IS_ACTIVE({modal: true, name: 'edit-product-drawer'})">
                  <v-icon small>mdi-update</v-icon>
                </v-btn>
              </template>
              <span>Edit</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" color="red" dark fab x-small
                       @click.stop="removeProduct(item.identifier   )">
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Delete</span>
            </v-tooltip>
          </template>


        </v-data-table>

        <!-- Right Overlay Drawer for Adding New Product -->
        <v-navigation-drawer
            width="500"
            :value="isActive.modal && isActive.name == 'add-new-product'"
            right
            fixed
            persistent
        >
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 sm12 md12>
                <!-- Global full Page loading  -->
                <fpl :isLoading="isLoading"></fpl>
                <v-card class="mt-2 mb-2">
                  <!-- Close Button -->
                  <v-btn
                      absolute
                      dark
                      fab
                      top
                      right
                      color="pink"
                      x-small
                      @click.native="SET_IS_ACTIVE({modal: false, name: null})"
                  >
                    <v-icon small>mdi-close</v-icon>
                  </v-btn>
                  <!-- End of Close Button -->
                  <v-card-title primary-title>Add Product</v-card-title>
                  <v-form
                      v-model="valid"
                      lazy-validation
                      ref="addNewProductForm">

                    <v-card-text>

                      <v-text-field
                          label="Product title*"
                          :value="productCreateForm.title"
                          @input="SET_ADD_PRODUCT_TITLE"
                          required
                          :rules="validationRules.textRules"
                      ></v-text-field>

                      <v-text-field
                          type="number"
                          label="Product price*"
                          :value="productCreateForm.price"
                          @input="SET_ADD_PRODUCT_PRICE"
                          required
                          :rules="validationRules.textRules"
                      ></v-text-field>

                      <v-text-field
                          type="text"
                          label="Product image url"
                          :value="productCreateForm.image_url"
                          @input="SET_ADD_PRODUCT_IMAGE_URL"
                          required
                          :rules="validationRules.textRules"
                      ></v-text-field>

                      <v-text-field
                          label="Product description"
                          :value="productCreateForm.description"
                          @input="SET_ADD_PRODUCT_DESCRIPTION"
                      ></v-text-field>

                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                          color="pink"
                          small
                          class="mr-1 text-white"
                          @click.prevent="SET_IS_ACTIVE({modal: false, name: null})"
                      >
                        <v-icon small>mdi-close</v-icon>
                        Close
                      </v-btn>

                      <v-btn
                          color="success"
                          small
                          :disabled="(!productCreateForm.title && !productCreateForm.price && productCreateForm.image_url) || isLoading"
                          @click="addProduct"
                      >
                        <v-icon small>mdi-plus</v-icon>
                        Add
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-navigation-drawer>
        <!-- End of Adding New Notes Drawer -->

        <!-- Right Overlay Drawer update Product -->
        <v-navigation-drawer
            width="500"
            :value="isActive.modal && isActive.name == 'edit-product-drawer'"
            right
            fixed
            persistent
        >
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 sm12 md12>
                <!-- Global full Page loading  -->
                <fpl :isLoading="isLoading"></fpl>
                <v-card class="mt-2 mb-2">
                  <!-- Close Button -->
                  <v-btn
                      absolute
                      dark
                      fab
                      top
                      right
                      color="pink"
                      x-small
                      @click.native="SET_IS_ACTIVE({modal: false, name: null})"
                  >
                    <v-icon small>mdi-close</v-icon>
                  </v-btn>
                  <!-- End of Close Button -->
                  <v-card-title primary-title>Edit Product</v-card-title>
                  <v-form
                      v-model="valid"
                      lazy-validation
                      ref="editProductForm">

                    <v-card-text>

                      <v-text-field
                          label="Product title*"
                          :value="productUpdateForm.title"
                          @input="SET_EDIT_PRODUCT_TITLE"
                          required
                          :rules="validationRules.textRules"
                      ></v-text-field>

                      <v-text-field
                          type="number"
                          label="Product price*"
                          :value="productUpdateForm.price"
                          @input="SET_EDIT_PRODUCT_PRICE"
                          required
                          :rules="validationRules.textRules"
                      ></v-text-field>

                      <v-text-field
                          type="text"
                          label="Product image url"
                          :value="productUpdateForm.image_url"
                          @input="SET_EDIT_PRODUCT_IMAGE_URL"
                          required
                          :rules="validationRules.textRules"
                      ></v-text-field>
                      <v-img
                          class="d-inline-block"
                          :lazy-src="edit_image_url"
                          max-height="80"
                          max-width="80"
                          :eager="true"
                          :src="edit_image_url"
                      ></v-img>

                      <v-text-field
                          label="Product description"
                          :value="productUpdateForm.description"
                          @input="SET_EDIT_PRODUCT_DESCRIPTION"
                      ></v-text-field>

                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                          color="pink"
                          small
                          class="mr-1 text-white"
                          @click.prevent="SET_IS_ACTIVE({modal: false, name: null})"
                      >
                        <v-icon small>mdi-close</v-icon>
                        Close
                      </v-btn>

                      <v-btn
                          color="success"
                          small
                          :disabled="(!productUpdateForm.title && !productUpdateForm.price && productUpdateForm.image_url) || isLoading"
                          @click="editProduct"
                      >
                        <v-icon small>mdi-update</v-icon>
                        Update
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-navigation-drawer>
        <!-- End of update Drawer -->


        <!-- Right Overlay Drawer for view Product -->
        <v-navigation-drawer
            width="500"
            :value="isActive.modal && isActive.name == 'view-product-drawer'"
            right
            fixed
            persistent
        >
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 sm12 md12>
                <!-- Global full Page loading  -->
                <fpl :isLoading="isLoading"></fpl>
                <v-card class="mt-2 mb-2">
                  <v-btn
                      absolute
                      dark
                      fab
                      top
                      right
                      color="pink"
                      x-small
                      @click.native="SET_IS_ACTIVE({modal: false, name: null})"
                  >
                    <v-icon small>mdi-close</v-icon>
                  </v-btn>
                  <!-- End of Close Button -->
                  <v-card-title primary-title>View Product</v-card-title>

                  <v-list-item>
                    <v-list-item-content class="d-inline-block">
                      <b>Product Id:</b>
                      {{ viewProduct.identifier }}
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content class="d-inline-block">
                      <b>Product Title:</b>
                      {{ viewProduct.product_title }}
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content class="d-inline-block">
                      <b>Product Price:</b>
                      ${{ viewProduct.product_price }}
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content class="d-inline-block">
                      <b>Product Image:</b>
                      <v-img
                          :lazy-src="viewProduct.product_image_path "
                          max-height="150"
                          max-width="250"
                          :eager="true"
                          :src="viewProduct.product_image_path "
                      ></v-img>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content class="d-inline-block">
                      <b>Product Description:</b>
                      {{ viewProduct.product_details }}
                    </v-list-item-content>
                  </v-list-item>

                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-navigation-drawer>
        <!-- End of view Product Drawer -->
      </v-card-text>


    </v-card>
  </v-col>
</template>

<script>
import {mapState, mapActions, mapMutations} from "vuex";

export default {
  name: "Product",
  data() {
    return {
      valid: true,
      headers: [
        {text: '#', value: 'identifier', sortable: false,},
        {
          text: 'Title',
          align: 'start',
          sortable: false,
          value: 'product_title',
        },
        {text: 'Image', value: 'product_image_path', sortable: false},
        {text: 'Price', value: 'product_price', sortable: false},
        {text: 'Description', value: 'product_details', sortable: false},
        {text: 'Action', value: 'Action', sortable: false},
      ],
      validationRules: {
        textRules: [v => !!v || 'Field is required'],
      }
    }
  },
  computed: {
    ...mapState('__helpers', [
      'isLoading',
      'commonErrors',
      'isActive'
    ]),

    ...mapState('product', [
      'products',
      'totalProducts',
      'pagination',
      'viewProduct',
      'productCreateForm',
      'productUpdateForm',
      'edit_image_url'
    ]),
  },
  methods: {
    ...mapMutations('product', [
      'SET_VIEW_PRODUCT_FOR_VIEW',
      'SET_ADD_PRODUCT_TITLE',
      'SET_ADD_PRODUCT_DESCRIPTION',
      'SET_ADD_PRODUCT_PRICE',
      'SET_ADD_PRODUCT_IMAGE_URL',
      'SET_VIEW_PRODUCT_FOR_VIEW',
      'SET_VIEW_PRODUCT_FOR_VIEW',
      'SET_EDIT_PRODUCT_FOR_EDIT',
      'SET_EDIT_PRODUCT_TITLE',
      'SET_EDIT_PRODUCT_DESCRIPTION',
      'SET_EDIT_PRODUCT_PRICE',
      'SET_EDIT_PRODUCT_IMAGE_URL',
    ]),
    ...mapMutations('__helpers', [
      'SET_IS_ACTIVE'
    ]),
    ...mapActions('product', [
      'getProducts',
      'addNewProduct',
      'updateProduct',
      'removeProduct'
    ]),
    async addProduct() {
      let _this = this
      await _this.addNewProduct()
      _this.$refs.addNewProductForm.reset()
      _this.$refs.addNewProductForm.resetValidation()
      _this.SET_IS_ACTIVE({modal: false, name: null})
    },
    async editProduct() {
      let _this = this
      await _this.updateProduct()
      _this.$refs.editProductForm.reset()
      _this.$refs.editProductForm.resetValidation()
      _this.SET_IS_ACTIVE({modal: false, name: null})
    },


  },
}
</script>

<style scoped>

</style>
