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

### vue-elastic-result-box

Component that renders search result hits.

This is the dummy component

#### Attributes

| Attribute | Description                                                                                                  | Type    | Required | Default | Accepted Values |
|-----------|--------------------------------------------------------------------------------------------------------------|---------|----------|---------|-----------------|
| keyword   | Keyword to search with against Elasticsearch                                                                 | String  | true     | -       | -               |
| fetching  | Indicates the fetching status                                                                                | Boolean | true     | -       |                 |
| result    | Search result object. It is used to render sub-templates. You can pass any data you want to use in templates | Object  | true     | -       |                 |

#### Slots

| Slot           | Description                     | Required | Scope                                                  | Default |
|----------------|---------------------------------|----------|--------------------------------------------------------|---------|
| result-header  | Template for result box header  | true     | { keyword: string, fetching: boolean, result: object } | -       |
| result-content | Template for result box content | true     | { keyword: string, fetching: boolean, result: object } | -       |

#### Example

```html
<vue-elastic-result-box
  :keyword="keyword"
  :fetching="fetching"
  :result="result">

  <template slot="result-header" slot-scope="{ keyword, fetching, result }">
    <div class="result-header">
      <div class="back-link">
        <router-link :to="{ name: 'Search' }"><i class="fa fa-chevron-left fa-2x" /></router-link>
      </div>

      <div class="result-title">
        <h1>Result for {{ keyword }}</h1>
      </div>

      <div class="result-count">
        <h3>{{ result.hits.length }} / {{ result.total }} loaded</h3>
      </div>
    </div>
  </template>

  <template slot="result-content" slot-scope="{ keyword, fetching, result }">
    <div class="result-content">

      <div class="loading" v-show="fetching">
        <div>
          <i class="fa fa-spinner fa-pulse fa-4x fa-fw"></i>
          <span class="sr-only">Loading...</span>
        </div>
      </div>

      <code class="result-query">{{ result.query }}</code>

      <b-container class="result-hits">
        <b-row>
          <b-col cols="*" sm="6" md="3" lg="2"
            v-for="(hit, key) in result.hits"
            :key="key"
            class="result-hit-item"
            @click="onHitClick(hit)">
            <img :src="`https://demoimg.miro.io/120_${hit._source.resource_id}.jpg`" alt="" class="result-hit-thumb">
          </b-col>
        </b-row>
      </b-container>

      <b-button v-if="result.hasNext" @click="loadMore()" variant="link">Load More</b-button>
    </div>
  </template>
</vue-elastic-result-box>
```
