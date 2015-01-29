/* globals Resource, Field, NumericField, FuzzyMatchField, MultiValueField */

/**
 * Represents a channel resource and its fields
 *
 * @memberOf LGI.Guide
 * @type {Resource}
 * @property {LGI.Guide~MultiValueField} REF
 * @property {LGI.Guide~FuzzyMatchField} NAME
 * @property {LGI.Guide~NumericField} POSITION
 * @property {LGI.Guide~Field} LOGO_LINK
 * @property {LGI.Guide~Field} OPENGRAPH_LINK
 */
var Channel = new Resource('channel', 'channels');

Channel.REF = new MultiValueField(Channel, 'ref');
Channel.NAME = new FuzzyMatchField(Channel, 'name');
Channel.POSITION = new NumericField(Channel, 'logicalPosition');
Channel.LOGO_LINK = new Field(Channel, 'logoLink');
Channel.OPENGRAPH_LINK = new Field('opengraphLink');
