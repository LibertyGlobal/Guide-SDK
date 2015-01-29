/* globals Resource, Field, NumericField */

/**
 * Represents a broadcast resource and its fields
 *
 * @memberOf LGI.Guide
 * @type {Resource}
 * @property {LGI.Guide~Field} IMI
 * @property {LGI.Guide~NumericField} START
 * @property {LGI.Guide~NumericField} END
 * @property {LGI.Guide~Field} CHANNEL
 * @property {LGI.Guide~NumericField} BUZZ_PER_MINUTE
 * @property {LGI.Guide~NumericField} POPULARITY
 */
var Broadcast = new Resource('broadcast', 'broadcasts');

Broadcast.IMI = new Field(Broadcast, 'imi');
Broadcast.START = new NumericField(Broadcast, 'start');
Broadcast.END = new NumericField(Broadcast, 'end');
Broadcast.CHANNEL = new Field(Broadcast, 'channel');
Broadcast.BUZZ_PER_MINUTE = new NumericField(Broadcast, 'statistics.bpm');
Broadcast.POPULARITY = new NumericField(Broadcast, 'statistics.popularity');
