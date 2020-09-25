<script>
    import { onDestroy } from 'svelte';
    import { newdoc } from '../stores/store.js';
    import { slugify } from '../helper.js';

    let formData;
    export let formOpen = true;

    const unsubscribe = newdoc.subscribe(value => formData = value);
    onDestroy(unsubscribe);

    let formState = {
      nameInvalid: false,
      fileInvalid: false,
      formInvalid: true
    };

    function uploadFile({target: {value}}) {
      const extension = value.split('.').reverse()[0];
      formState.fileInvalid = extension !== 'pdf';
    }

    function submitForm(ev) {
      ev.preventDefault();
      console.log('form is submited')
    }

    function validateForm({target: {name, value}}) {
      // validate for correct content
      switch (name) {
        case 'name': 
          if (!value.trim().length) {
            formState.nameInvalid = true;
            newdoc.update(model => Object.assign({}, model, {'name': '', 'slug': ''}))
          } else {
            formState.nameInvalid = false;
            newdoc.update(model => Object.assign({}, model, {'name': value.trim()}));
            newdoc.update(model => Object.assign({}, model, {'slug': slugify(value)}));
          }
      }
      
      // then set form state valid or invalid if invalid or contains empty fields
      formState.formInvalid = Object.keys(formState).some(key => key!=='formInvalid' && formState[key] === true) || 
            Object.keys(formData).some(key => !formData[key].trim().length);
      console.info({formState, formData})
    }

    const closeForm = _ => formOpen = false;

</script>

<style>
  .form-container {
    box-shadow: 1px 1px 37px #ccc;
    padding: 1em;
    position: relative;
  }
  .file {
    margin-left: auto;
  }
  .action-buttons {
    justify-content: space-between;
  }
  .button {
    margin-top: 2em;
  }
</style>
<div class="form-container">
  <h1>Upload new document form</h1>
  <form on:change={validateForm}>
    <div class="field">
        <input 
            name='name'
            class="input is-small" 
            class:is-danger={formState.nameInvalid}
            class:is-primary={!formState.nameInvalid}
            type="text" 
            placeholder="Document's Name">
    </div>
    <div class="field">
        <input 
            disabled 
            name='slug'
            class="input is-small is-info" 
            type="text"
            bind:value={$newdoc.slug} 
            placeholder="Document's Slug (will autogenerate)">
    </div>
    <div class="field">
        <input 
            class="input is-small is-primary" 
            type="url" 
            bind:value={$newdoc.url}
            placeholder="Where you can find it? Document's Url">
    </div>
    <div class="control is-flex">
      <label class="radio">
        <input 
          selected
          type="radio" 
          name="answer" 
          bind:group={$newdoc.type} 
          value='pdf'>PDF </label>
      <label class="radio">
        <input 
          disabled
          type="radio" 
          name="answer" 
          bind:group={$newdoc.type} 
          value='images'>Imagesv</label>
    
      <div class="file has-name is-small is-fullwidth">
          <label class="file-label">
            <input 
                class="file-input is-small" 
                bind:value={$newdoc.file}  
                type="file" 
                on:change={uploadFile}
                name="pdf">
            <span class="file-cta">
                <span class="file-icon">
                <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                Choose a PDF file…
                </span>
            </span>
            {#if formData.file.length}
              <span class="file-name">
                {formData.file}
              </span>
            {/if}
          </label>
      </div>
    </div>
    <div class="is-flex action-buttons">
      <button 
        disabled={formState.formInvalid}
        class="button is-half"
        class:is-danger={formState.formInvalid}
        class:is-primary={!formState.formInvalid}
        on:click={submitForm}
      >Submit</button>
      <button 
        class="button is-half is-warning"
        on:click={closeForm}
      >Close</button>
    </div>
  </form>
</div>
