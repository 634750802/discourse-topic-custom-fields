import { withPluginApi } from 'discourse/lib/plugin-api';
import discourseComputed from "discourse-common/utils/decorators";
import { alias } from '@ember/object/computed';
import { isDefined, fieldInputTypes } from '../lib/topic-custom-field';

export default {
  name: "topic-custom-field-intializer",
  initialize(container) {
    const siteSettings = container.lookup('site-settings:main');
    const fieldName = siteSettings.topic_custom_field_name;
    const fieldType = siteSettings.topic_custom_field_type;
    
    withPluginApi('0.11.2', api => {
      
      /*
       * type:        step
       * number:      5
       * title:       Show an input in the composer
       * description: If your field can be created or edited by users, you need
       *              to show an input in the composer.
       * references:  app/assets/javascripts/discourse/app/templates/composer.hbs,
       *              app/assets/javascripts/discourse/app/components/plugin-outlet.js.es6
       */
      
      /*
       * type:        step
       * number:      5.1
       * title:       Setup the composer connector class
       * description: Set the actions and properties you'll need in the
       *              composer connector template.
       * references:  app/assets/javascripts/discourse/app/components/plugin-outlet.js.es6
       */
      api.registerConnectorClass('composer-fields', 'composer-topic-custom-field-container', {
        setupComponent(attrs, component) {
          const model = attrs.model;
          let can_display = true;
          if (model.post || model.action == 'reply') {
            can_display = false
          }

          const versions = [
          "v6.5.0",
          "v6.4.0",
          "v6.3.0",
          "v6.2.0",
          "v6.1.3",
          "v6.1.2",
          "v6.1.1",
          "v6.1.0",
          "v6.0.0",
          "v5.4.3",
          "v5.4.2",
          "v5.4.1",
          "v5.4.0",
          "v5.3.3",
          "v5.3.2",
          "v5.3.1",
          "v5.3.0",
          "v5.2.4",
          "v5.2.3",
          "v5.2.2",
          "v5.2.1",
          "v5.2.0",
          "v5.1.4",
          "v5.1.3",
          "v5.1.2",
          "v5.1.1",
          "v5.1.0",
          "v5.0.6",
          "v5.0.5",
          "v5.0.4",
          "v5.0.3",
          "v5.0.2",
          "v5.0.1",
          "v5.0.0",
          "v4.0.9",
          "v4.0.8",
          "v4.0.7",
          "v4.0.6",
          "v4.0.5",
          "v4.0.4",
          "v4.0.3",
          "v4.0.2",
          "v4.0.16",
          "v4.0.15",
          "v4.0.14",
          "v4.0.13",
          "v4.0.12",
          "v4.0.11",
          "v4.0.10",
          "v4.0.1",
          "v4.0.0",
          "v3.1.2",
          "v3.1.1",
          "v3.1.0",
          "v3.0.9",
          "v3.0.8",
          "v3.0.7",
          "v3.0.6",
          "v3.0.5",
          "v3.0.4",
          "v3.0.3",
          "v3.0.20",
          "v3.0.2",
          "v3.0.19",
          "v3.0.18",
          "v3.0.17",
          "v3.0.16",
          "v3.0.15",
          "v3.0.14",
          "v3.0.13",
          "v3.0.12",
          "v3.0.11",
          "v3.0.10",
          "v3.0.1",
          "v3.0.0",
          "v2.1.9",
          "v2.1.8",
          "v2.1.7",
          "v2.1.6",
          "v2.1.5",
          "v2.1.4",
          "v2.1.3",
          "v2.1.2",
          "v2.1.19",
          "v2.1.18",
          "v2.1.17",
          "v2.1.16",
          "v2.1.15",
          "v2.1.14",
          "v2.1.13",
          "v2.1.12",
          "v2.1.11",
          "v2.1.10",
          "v2.1.1",
          "v2.1.0",
          "v2.0.9",
          "v2.0.8",
          "v2.0.7",
          "v2.0.6",
          "v2.0.5",
          "v2.0.4",
          "v2.0.3",
          "v2.0.2",
          "v2.0.11",
          "v2.0.10",
          "v2.0.1",
          "v2.0.0",
          "v1.0.9",
          "v1.0.8",
          "v1.0.7",
          "v1.0.6",
          "v1.0.5",
          "v1.0.4",
          "v1.0.3",
          "v1.0.2",
          "v1.0.1",
          "v1.0.0",
          "暂未使用 TiDB"
        ];

          // If the first post is being edited we need to pass our value from
          // the topic model to the composer model.
          if (!isDefined(model[fieldName]) && model.topic && model.topic[fieldName]) {
            model.set(fieldName, model.topic[fieldName]);
          }
          
          let props = {
            fieldName: fieldName,
            fieldValue: model.get(fieldName)
          }
          component.setProperties(Object.assign(props, fieldInputTypes(fieldType)));
          component.set("can_display", can_display);
          component.set("versions", versions);
        },
        
        actions: {
          onChangeField(fieldValue) {
            this.set(`model.${fieldName}`, fieldValue);
          }
        }
      });
      
      /*
       * type:        step
       * number:      5.2
       * title:       Render an input in the composer
       * description: Render an input where the user can edit your field in the
       *              composer.
       * location:    plugins/discourse-topic-custom-fields/assets/javascripts/discourse/connectors/composer-fields/composer-topic-custom-field-container.hbs
       * references:  app/assets/javascripts/discourse/app/templates/composer.hbs
       */
      
      /*
       * type:        step
       * number:      6
       * title:       Show an input in topic title edit
       * description: If your field can be edited by the topic creator or
       *              staff, you may want to let them do this in the topic
       *              title edit view.
       * references:  app/assets/javascripts/discourse/app/templates/topic.hbs,
       *              app/assets/javascripts/discourse/app/components/plugin-outlet.js.es6
       */
      
      /*
       * type:        step
       * number:      6.1
       * title:       Setup the edit topic connector class
       * description: Set the actions and properties you'll need in the edit
       *              topic connector template.
       * references:  app/assets/javascripts/discourse/app/components/plugin-outlet.js.es6
       */
      api.registerConnectorClass('edit-topic', 'edit-topic-custom-field-container', {
        setupComponent(attrs, component) {
          const model = attrs.model;
          const versions = [
            "v6.5.0",
            "v6.4.0",
            "v6.3.0",
            "v6.2.0",
            "v6.1.3",
            "v6.1.2",
            "v6.1.1",
            "v6.1.0",
            "v6.0.0",
            "v5.4.3",
            "v5.4.2",
            "v5.4.1",
            "v5.4.0",
            "v5.3.3",
            "v5.3.2",
            "v5.3.1",
            "v5.3.0",
            "v5.2.4",
            "v5.2.3",
            "v5.2.2",
            "v5.2.1",
            "v5.2.0",
            "v5.1.4",
            "v5.1.3",
            "v5.1.2",
            "v5.1.1",
            "v5.1.0",
            "v5.0.6",
            "v5.0.5",
            "v5.0.4",
            "v5.0.3",
            "v5.0.2",
            "v5.0.1",
            "v5.0.0",
            "v4.0.9",
            "v4.0.8",
            "v4.0.7",
            "v4.0.6",
            "v4.0.5",
            "v4.0.4",
            "v4.0.3",
            "v4.0.2",
            "v4.0.16",
            "v4.0.15",
            "v4.0.14",
            "v4.0.13",
            "v4.0.12",
            "v4.0.11",
            "v4.0.10",
            "v4.0.1",
            "v4.0.0",
            "v3.1.2",
            "v3.1.1",
            "v3.1.0",
            "v3.0.9",
            "v3.0.8",
            "v3.0.7",
            "v3.0.6",
            "v3.0.5",
            "v3.0.4",
            "v3.0.3",
            "v3.0.20",
            "v3.0.2",
            "v3.0.19",
            "v3.0.18",
            "v3.0.17",
            "v3.0.16",
            "v3.0.15",
            "v3.0.14",
            "v3.0.13",
            "v3.0.12",
            "v3.0.11",
            "v3.0.10",
            "v3.0.1",
            "v3.0.0",
            "v2.1.9",
            "v2.1.8",
            "v2.1.7",
            "v2.1.6",
            "v2.1.5",
            "v2.1.4",
            "v2.1.3",
            "v2.1.2",
            "v2.1.19",
            "v2.1.18",
            "v2.1.17",
            "v2.1.16",
            "v2.1.15",
            "v2.1.14",
            "v2.1.13",
            "v2.1.12",
            "v2.1.11",
            "v2.1.10",
            "v2.1.1",
            "v2.1.0",
            "v2.0.9",
            "v2.0.8",
            "v2.0.7",
            "v2.0.6",
            "v2.0.5",
            "v2.0.4",
            "v2.0.3",
            "v2.0.2",
            "v2.0.11",
            "v2.0.10",
            "v2.0.1",
            "v2.0.0",
            "v1.0.9",
            "v1.0.8",
            "v1.0.7",
            "v1.0.6",
            "v1.0.5",
            "v1.0.4",
            "v1.0.3",
            "v1.0.2",
            "v1.0.1",
            "v1.0.0",
            "暂未使用 TiDB"
          ];
          
          let props = {
            fieldName: fieldName,
            fieldValue: model.get(fieldName)
          }
          component.setProperties(Object.assign(props, fieldInputTypes(fieldType)));
          component.set("versions", versions);
        },
        
        actions: {
          onChangeField(fieldValue) {
            this.set(`buffered.${fieldName}`, fieldValue);
          }
        }
      });
      
      /*
       * type:        step
       * number:      6.2
       * title:       Render an input in topic edit
       * description: Render an input where the user can edit your field in
       *              topic edit.
       * location:    plugins/discourse-topic-custom-fields/assets/javascripts/discourse/connectors/edit-topic/edit-topic-custom-field-container.hbs
       * references:  app/assets/javascripts/discourse/app/templates/topic.hbs
       */
         
      /*
       * type:        step
       * number:      7
       * title:       Serialize your field to the server
       * description: Send your field along with the post and topic data saved
       *              by the user when creating a new topic, saving a draft, or
       *              editing the first post of an existing topic.
       * references:  app/assets/javascripts/discourse/app/lib/plugin-api.js.es6,
       *              app/assets/javascripts/discourse/app/models/composer.js.es6
       */
      api.serializeOnCreate(fieldName);
      api.serializeToDraft(fieldName);
      api.serializeToTopic(fieldName, `topic.${fieldName}`);
      
      /*
       * type:        step
       * number:      8
       * title:       Display your field value
       * description: Display the value of your custom topic field below the 
       *              title in the topic, and after the title in the topic
       *              list.
       */
      
      /*
       * type:        step
       * number:      8.1
       * title:       Setup the topic title connector component
       * description: Set the actions and properties you'll need in the topic
       *              title
       *              connector template.
       * references:  app/assets/javascripts/discourse/app/components/plugin-outlet.js.es6
       */
      api.registerConnectorClass('topic-title', 'topic-title-custom-field-container', {
        setupComponent(attrs, component) {
          const model = attrs.model;
          const controller = container.lookup('controller:topic');
          
          component.setProperties({
            fieldName: fieldName,
            fieldValue: model.get(fieldName),
            showField: !controller.get('editingTopic') && isDefined(model.get(fieldName))
          });

          controller.addObserver('editingTopic', () => {
            if (this._state === 'destroying') return;
            component.set('showField', !controller.get('editingTopic') && isDefined(model.get(fieldName)));
          });
          
          model.addObserver(fieldName, () => {
            if (this._state === 'destroying') return;
            component.set('fieldValue', model.get(fieldName));
          });
        }
      });
      
      /*
       * type:        step
       * number:      8.2
       * title:       Render the value in the topic title plugin outlet
       * description: Render the value of the custom topic field under the
       *              topic title, unless the topic title is currently being
       *              edited.
       * location:    plugins/discourse-topic-custom-fields/assets/javascripts/discourse/connectors/topic-title/topic-title-custom-field-container.hbs
       * references:  app/assets/javascripts/discourse/app/templates/topic.hbs
       */
      
      /*
       * type:        step
       * number:      8.3
       * title:       Setup the topic list item component
       * description: Setup the properties you'll need in the topic list item
       *              template. You can't do this in a connector js file, as
       *              the topic list item is a raw template, which doesn't
       *              support js.
       * references:  app/assets/javascripts/discourse/app/components/topic-list-item.js.es6,
       *              app/assets/javascripts/discourse/app/helpers/raw-plugin-outlet.js.es6
       */
      api.modifyClass('component:topic-list-item', {
        customFieldName: fieldName,
        customFieldValue: alias(`topic.${fieldName}`),

        @discourseComputed('customFieldValue')
        showCustomField: (value) => (isDefined(value))
      });
      
      /*
       * type:        step
       * number:      8.4
       * title:       Render the value in the topic list after title plugin
       *              outlet
       * description: Render the value of the custom topic field in the topic
       *              list, after the topic title.
       * location:    plugins/discourse-topic-custom-fields/assets/javascripts/discourse/connectors/topic-list-after-title/topic-list-after-title-custom-field-container.hbr
       * references:  app/assets/javascripts/discourse/app/templates/list/topic-list-item.hbr
       */
    });
  }
}
