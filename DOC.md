# vue-elasticsearch

> An Elasticsearch wrapper for vue.js

## Get started

```javascript
import VueElastic from 'vue-elasticsearch'

Vue.use(VueElastic, {
  suggest: {
    host: 'http://localhost:9200',  // Host that provides suggestions
    index: 'test',                  // Index
    type: 'suggestions'             // Type
  },
  search: {
    host: 'http://localhost:9200',  // Host that provides suggestions
    index: 'test',                  // Index
    type: 'tags'                    // Type
  }
})
```

## Components

### vue-elastic-autocomplete

Autocomplete input

#### Attributes

| Attribute       | Description                                      | Type   | Required | Default                    | Accepted Values |
|-----------------|--------------------------------------------------|--------|----------|----------------------------|-----------------|
| inputClass      | CSS class that applies to the autocomplete input | String | false    | ve-autocomplete-input      |        -        |
| suggestionClass | CSS class that applies to the suggestion item    | String | false    | ve-autocomplete-suggestion |        -        |

#### Events

| Event     | Description                                            | Event Data          |
|-----------|--------------------------------------------------------|---------------------|
| @selected | triggers when keyword is selected from the suggestions | { keyword: string } |

#### Slots

| Slot             | Description                                      | Required | Scope                  | Default                                      |
|------------------|--------------------------------------------------|----------|------------------------|----------------------------------------------|
| input-box-header | Template that is added before autocomplete input | false    |            -           |                       -                      |
| input-box-footer | Template that is added after autocomplete input  | false    |            -           |                       -                      |
| suggestion       | Template for suggestion item                     | false    | { suggestion: object } | {{ suggestion.text }} {{ suggestion.score }} |

#### Example

```html
<vue-elastic-autocomplete
    inputClass="ve-autocomplete-input"
    suggestionClass="ve-autocomplete-suggestion"
    @selected="onSelect">

    <template slot="input-box-header">
    </template>

    <template slot="input-box-footer">
        <i class="fa fa-search"></i>
    </template>

    <template slot="suggestion" slot-scope="{ suggestion }">
        {{ suggestion.text }} {{ suggestion.score }}
    </template>

</vue-elastic-autocomplete>
```
