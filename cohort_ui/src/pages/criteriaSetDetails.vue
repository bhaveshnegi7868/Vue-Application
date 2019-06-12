<template>
  <div class="col ">
      <div class="form_header-des RightForm">
          <q-input class="col-5 cohort-des_form-box3 theamBGcolor2" v-model="cname" placeholder="Criteria Set Name"/>
          <q-input class="col cohort-des_form-box2 theamBGcolor2" v-model="cdesc" placeholder="Criteria Set Description"/>
      </div>
      <div class="Form_Body-des row mar10T">
          <div class="col-2 eventList">
              <div class="EventList_header">
                  Events
              </div>
              <div class="header_Bor1"></div>
              <div  class="Events" draggable="true" ondragstart="drag(event)">
                  Diagnosis
              </div>
              <div  class="Events">
                  Treatement
              </div>
              <div class="Events">
                  Procedure
              </div>
          </div>
          <div class="col-5 mar210L DCriteria categories_detailed-Form demo" ondrop="drop(event)" ondragover="allowDrop(event)">
            <div class="categories_details  " >
              <div id="parentGroup" class="clearfix">
                  <div id="topSelector" class="row mx-1">
                      <div class=" dropdown col-5 p-0 ">
                          <button class="btn btn-secondary categories_details-selectBox m-1 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Select
                          </button>
                          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <a class="dropdown-item">Action</a>
                              <a class="dropdown-item">Another action</a>
                              <a class="dropdown-item">Something else here</a>
                          </div>
                      </div>
                      <div class="col-6 p-1"><span class="of-the-criteria">of the criteria</span></div>
                  </div>

                    <div id="topParentDivSelector"></div>
                  <div id="parentActionsBox" class="my-2 mx-2">
                      <div class="form-group">
                          <div class=" dropdown  p-0 ">
                              <select id="selectEventBox" name="Age-at-Treatement:" class="custom-select categories_details-selectBox ">
                                  <option value="Select Event" disabled selected>Select Event</option>
                                  <option id="DiagnosisBOX" value="Diagnosis">Diagnosis</option>
                                  <option  id="TreatementBOX" value="Treatement">Treatement</option>
                                  <option  id="ProcedureBOX" value="Procedure">Procedure</option>
                              </select>
                          </div>
                      </div>

                      <div class="clearfix add_group">
                          <button id ="addGroup" type="submit" class="btn btn-success float-right"> Add Group</button>
                      </div>
                  </div>
                </div>
              </div>
          </div>
          <div id="detailedFormDiv" class="col detailedForm mar210L">
              <div id="TreatementForm">
                  <div class="event-detailedForm_header p-1 ">
                      Event Attributes - Treatement
                  </div>
                  <div class="header_Bor1"></div>
                  <div>
                      <form action="/action_page.php">
                          <div class="form-group">
                              <label for="email">Name:</label>
                              <input type="email" class="form-control theamBGcolor2" id="email" placeholder="Name" name="email">
                          </div>
                          <div class="form-group">
                              <label for="pwd">Procedure List:</label>
                              <div class=" dropdown col-5 p-0 ">
                                  <select name="Age-at-Treatement:" class="custom-select categories_details-selectBox ">
                                      <option value="Less than">Less than</option>
                                      <option value="Less or Equal to">Less or Equal to</option>
                                      <option value="Equal to">Equal to</option>
                                      <option value="Greater than">Greater than</option>
                                      <option value="Greater or Equal to">Greater or Equal to</option>
                                      <option value="Between">Between</option>
                                      <option value="Not Between">Not Between</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group">
                              <label for="email">Age at Treatement:</label>
                              <div class=" dropdown col-5 p-0 ">
                                  <select name="Age-at-Treatement:" class="custom-select categories_details-selectBox ">
                                      <option value="Less than">Less than</option>
                                      <option value="Less or Equal to">Less or Equal to</option>
                                      <option value="Equal to">Equal to</option>
                                      <option value="Greater than">Greater than</option>
                                      <option value="Greater or Equal to">Greater or Equal to</option>
                                      <option value="Between">Between</option>
                                      <option value="Not Between">Not Between</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group">
                              <label for="email">Quantity:</label>
                              <div class=" dropdown col-5 p-0 ">
                                  <select name="Quantity" class="custom-select categories_details-selectBox ">
                                      <option value="Less than">Less than</option>
                                      <option value="Less or Equal to">Less or Equal to</option>
                                      <option value="Equal to">Equal to</option>
                                      <option value="Greater than">Greater than</option>
                                      <option value="Greater or Equal to">Greater or Equal to</option>
                                      <option value="Between">Between</option>
                                      <option value="Not Between">Not Between</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group">
                              <label for="email">Procedure type:</label>
                              <div class=" col-5 p-0 ">
                                  <select name="cars" class="custom-select categories_details-selectBox ">
                                      <option selected>Custom Select Menu</option>
                                      <option value="volvo">Volvo</option>
                                      <option value="fiat">Fiat</option>
                                      <option value="audi">Audi</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group">
                              <label for="email">Provider specialty:</label>
                              <div class=" dropdown col-5 p-0 ">
                                  <select name="Age-at-Treatement:" class="custom-select categories_details-selectBox ">
                                      <option value="Less than">Less than</option>
                                      <option value="Less or Equal to">Less or Equal to</option>
                                      <option value="Equal to">Equal to</option>
                                      <option value="Greater than">Greater than</option>
                                      <option value="Greater or Equal to">Greater or Equal to</option>
                                      <option value="Between">Between</option>
                                      <option value="Not Between">Not Between</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group">
                              <label for="pwd">Procedure occurrence date:</label>
                              <div class=" dropdown col-5 p-0 ">
                                  <select name="Procedure-occurrence-date" class="custom-select categories_details-selectBox ">
                                      <option value="Before"> Before </option>
                                      <option value="On or Before"> On or Before </option>
                                      <option value="On"> On </option>
                                      <option value="After"> After </option>
                                      <option value="On or After"> On or After </option>
                                      <option value="Between"> Between </option>
                                      <option value="Not Between"> Not Between </option>
                                  </select>

                              </div>
                          </div>
                          <div class="form-group">
                              <label for="pwd">Gender:</label>
                              <div class=" dropdown col-5 p-0 ">
                                  <select name="Age-at-Treatement:" class="custom-select categories_details-selectBox ">
                                      <option value="male">Male</option>
                                      <option value="Female">Female</option>
                                      <option value="other">other</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group">
                              <label for="pwd">Visit type:</label>
                              <div class=" dropdown col-5 p-0 ">
                                  <select name="Age-at-Treatement:" class="custom-select categories_details-selectBox ">
                                      <option value="Less than">Less than</option>
                                      <option value="Less or Equal to">Less or Equal to</option>
                                      <option value="Equal to">Equal to</option>
                                      <option value="Greater than">Greater than</option>
                                      <option value="Greater or Equal to">Greater or Equal to</option>
                                      <option value="Between">Between</option>
                                      <option value="Not Between">Not Between</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group form-check">
                              <input class="form-check-input theamBGcolor2" type="checkbox" name="remember">
                              <label class="form-check-label">Limit to first procedure occurrence only </label>
                          </div>
                          <button type="submit" class="btn btn-primary">Submit</button>
                      </form>
                  </div>
              </div>
              <div id="ProcedureForm">
                  <div class="event-detailedForm_header p-1 ">
                      Event Attributes - Procedure
                  </div>
                  <div class="header_Bor1"></div>
                  <div>
                      <form action="/action_page.php">
                          <div class="form-group">
                              <label for="email">Name:</label>
                              <input type="email" class="form-control theamBGcolor2" id="email" placeholder="Name" name="email">
                          </div>
                          <div class="form-group">
                              <label for="pwd">Procedure List:</label>
                              <div class=" dropdown col-5 p-0 ">
                                  <select name="Age-at-Treatement:" class="custom-select categories_details-selectBox ">
                                      <option value="Less than">Less than</option>
                                      <option value="Less or Equal to">Less or Equal to</option>
                                      <option value="Equal to">Equal to</option>
                                      <option value="Greater than">Greater than</option>
                                      <option value="Greater or Equal to">Greater or Equal to</option>
                                      <option value="Between">Between</option>
                                      <option value="Not Between">Not Between</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group">
                              <label for="email">Age at Treatement:</label>
                              <div class=" dropdown col-5 p-0 ">
                                  <select name="Age-at-Treatement:" class="custom-select categories_details-selectBox ">
                                      <option value="Less than">Less than</option>
                                      <option value="Less or Equal to">Less or Equal to</option>
                                      <option value="Equal to">Equal to</option>
                                      <option value="Greater than">Greater than</option>
                                      <option value="Greater or Equal to">Greater or Equal to</option>
                                      <option value="Between">Between</option>
                                      <option value="Not Between">Not Between</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group">
                              <label for="email">Quantity:</label>
                              <div class=" dropdown col-5 p-0 ">
                                  <select name="Quantity" class="custom-select categories_details-selectBox ">
                                      <option value="Less than">Less than</option>
                                      <option value="Less or Equal to">Less or Equal to</option>
                                      <option value="Equal to">Equal to</option>
                                      <option value="Greater than">Greater than</option>
                                      <option value="Greater or Equal to">Greater or Equal to</option>
                                      <option value="Between">Between</option>
                                      <option value="Not Between">Not Between</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group">
                              <label for="email">Procedure type:</label>
                              <div class=" col-5 p-0 ">
                                  <select name="cars" class="custom-select categories_details-selectBox ">
                                      <option selected>Custom Select Menu</option>
                                      <option value="volvo">Volvo</option>
                                      <option value="fiat">Fiat</option>
                                      <option value="audi">Audi</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group">
                              <label for="email">Provider specialty:</label>
                              <div class=" dropdown col-5 p-0 ">
                                  <select name="Age-at-Treatement:" class="custom-select categories_details-selectBox ">
                                      <option value="Less than">Less than</option>
                                      <option value="Less or Equal to">Less or Equal to</option>
                                      <option value="Equal to">Equal to</option>
                                      <option value="Greater than">Greater than</option>
                                      <option value="Greater or Equal to">Greater or Equal to</option>
                                      <option value="Between">Between</option>
                                      <option value="Not Between">Not Between</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group">
                              <label for="pwd">Procedure occurrence date:</label>
                              <div class=" dropdown col-5 p-0 ">
                                  <select name="Procedure-occurrence-date" class="custom-select categories_details-selectBox ">
                                      <option value="Before"> Before </option>
                                      <option value="On or Before"> On or Before </option>
                                      <option value="On"> On </option>
                                      <option value="After"> After </option>
                                      <option value="On or After"> On or After </option>
                                      <option value="Between"> Between </option>
                                      <option value="Not Between"> Not Between </option>
                                  </select>

                              </div>
                          </div>
                          <div class="form-group">
                              <label for="pwd">Gender:</label>
                              <div class=" dropdown col-5 p-0 ">
                                  <select name="Age-at-Treatement:" class="custom-select categories_details-selectBox ">
                                      <option value="male">Male</option>
                                      <option value="Female">Female</option>
                                      <option value="other">other</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group">
                              <label for="pwd">Visit type:</label>
                              <div class=" dropdown col-5 p-0 ">
                                  <select name="Age-at-Treatement:" class="custom-select categories_details-selectBox ">
                                      <option value="Less than">Less than</option>
                                      <option value="Less or Equal to">Less or Equal to</option>
                                      <option value="Equal to">Equal to</option>
                                      <option value="Greater than">Greater than</option>
                                      <option value="Greater or Equal to">Greater or Equal to</option>
                                      <option value="Between">Between</option>
                                      <option value="Not Between">Not Between</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group form-check">
                              <input class="form-check-input theamBGcolor2" type="checkbox" name="remember">
                              <label class="form-check-label">Limit to first procedure occurrence only </label>
                          </div>
                          <button type="submit" class="btn btn-primary">Submit</button>
                      </form>
                  </div>
              </div>
              <div id="DiagnosisForm">
                  <div class="event-detailedForm_header p-1 ">
                      Event Attributes - Diagnosis
                  </div>
                  <div class="header_Bor1"></div>
                  <div>
                      <form action="/action_page.php">
                          <div class="form-group">
                              <label for="email">Name:</label>
                              <input type="email" class="form-control theamBGcolor2" id="email" placeholder="Name" name="email">
                          </div>
                          <div class="form-group">
                              <label for="pwd">Procedure List:</label>
                              <div class=" dropdown col-5 p-0 ">
                                  <select name="Age-at-Treatement:" class="custom-select categories_details-selectBox ">
                                      <option value="Less than">Less than</option>
                                      <option value="Less or Equal to">Less or Equal to</option>
                                      <option value="Equal to">Equal to</option>
                                      <option value="Greater than">Greater than</option>
                                      <option value="Greater or Equal to">Greater or Equal to</option>
                                      <option value="Between">Between</option>
                                      <option value="Not Between">Not Between</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group">
                              <label for="email">Age at Treatement:</label>
                              <div class=" dropdown col-5 p-0 ">
                                  <select name="Age-at-Treatement:" class="custom-select categories_details-selectBox ">
                                      <option value="Less than">Less than</option>
                                      <option value="Less or Equal to">Less or Equal to</option>
                                      <option value="Equal to">Equal to</option>
                                      <option value="Greater than">Greater than</option>
                                      <option value="Greater or Equal to">Greater or Equal to</option>
                                      <option value="Between">Between</option>
                                      <option value="Not Between">Not Between</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group">
                              <label for="email">Quantity:</label>
                              <div class=" dropdown col-5 p-0 ">
                                  <select name="Quantity" class="custom-select categories_details-selectBox ">
                                      <option value="Less than">Less than</option>
                                      <option value="Less or Equal to">Less or Equal to</option>
                                      <option value="Equal to">Equal to</option>
                                      <option value="Greater than">Greater than</option>
                                      <option value="Greater or Equal to">Greater or Equal to</option>
                                      <option value="Between">Between</option>
                                      <option value="Not Between">Not Between</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group">
                              <label for="email">Procedure type:</label>
                              <div class=" col-5 p-0 ">
                                  <select name="cars" class="custom-select categories_details-selectBox ">
                                      <option selected>Custom Select Menu</option>
                                      <option value="volvo">Volvo</option>
                                      <option value="fiat">Fiat</option>
                                      <option value="audi">Audi</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group">
                              <label for="email">Provider specialty:</label>
                              <div class=" dropdown col-5 p-0 ">
                                  <select name="Age-at-Treatement:" class="custom-select categories_details-selectBox ">
                                      <option value="Less than">Less than</option>
                                      <option value="Less or Equal to">Less or Equal to</option>
                                      <option value="Equal to">Equal to</option>
                                      <option value="Greater than">Greater than</option>
                                      <option value="Greater or Equal to">Greater or Equal to</option>
                                      <option value="Between">Between</option>
                                      <option value="Not Between">Not Between</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group">
                              <label for="pwd">Procedure occurrence date:</label>
                              <div class=" dropdown col-5 p-0 ">
                                  <select name="Procedure-occurrence-date" class="custom-select categories_details-selectBox ">
                                      <option value="Before"> Before </option>
                                      <option value="On or Before"> On or Before </option>
                                      <option value="On"> On </option>
                                      <option value="After"> After </option>
                                      <option value="On or After"> On or After </option>
                                      <option value="Between"> Between </option>
                                      <option value="Not Between"> Not Between </option>
                                  </select>

                              </div>
                          </div>
                          <div class="form-group">
                              <label for="pwd">Gender:</label>
                              <div class=" dropdown col-5 p-0 ">
                                  <select name="Age-at-Treatement:" class="custom-select categories_details-selectBox ">
                                      <option value="male">Male</option>
                                      <option value="Female">Female</option>
                                      <option value="other">other</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group">
                              <label for="pwd">Visit type:</label>
                              <div class=" dropdown col-5 p-0 ">
                                  <select name="Age-at-Treatement:" class="custom-select categories_details-selectBox ">
                                      <option value="Less than">Less than</option>
                                      <option value="Less or Equal to">Less or Equal to</option>
                                      <option value="Equal to">Equal to</option>
                                      <option value="Greater than">Greater than</option>
                                      <option value="Greater or Equal to">Greater or Equal to</option>
                                      <option value="Between">Between</option>
                                      <option value="Not Between">Not Between</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group form-check">
                              <input class="form-check-input theamBGcolor2" type="checkbox" name="remember">
                              <label class="form-check-label">Limit to first procedure occurrence only </label>
                          </div>
                          <button type="submit" class="btn btn-primary">Submit</button>
                      </form>
                  </div>
              </div>
          </div>
        </div>
    </div>
</template>
<script>
import {
  QInput
} from 'quasar'
export default {
  QInput,
  name: 'criteriaSetDetails',
  methods: {
    /**
    * Given a generator function, this component's inputValue is set
    * to the return value of the generator.
    *
    * @param Function
    **/
    generateValue: function (generator) {
      // set this component's value prop as result of supplied generator function
      return 1
    }
  },

  props: {
    'value': String,
    'required': Boolean,
    'disable': Boolean,
    'label': String,
    'inputclasses': String,
    'componentclasses': String,
    'cdesc': String,
    'cname': String
  },

  computed: {
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style>
.icon-generate {
  float:right;
  width:16px;
  height:16px;
  border:1px dashed red;
}
</style>
