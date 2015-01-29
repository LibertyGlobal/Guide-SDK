/* globals Resource, Field, NumericField, TextField, FuzzyMatchField */

/**
 * Represents a video resource and its fields
 *
 * @memberOf LGI.Guide
 * @type {Resource}
 * @property {LGI.Guide~Field} CRID
 * @property {LGI.Guide~FuzzyMatchField} TITLE
 * @property {LGI.Guide~Field} SHORT_SYNOPSIS
 * @property {LGI.Guide~Field} SYNOPSIS
 * @property {LGI.Guide~FuzzyMatchField} CATEGORY
 * @property {LGI.Guide~NumericField} SEASON
 * @property {LGI.Guide~NumericField} EPISODE
 * @property {LGI.Guide~Field} STATISTICS
 * @property {LGI.Guide~TextField} AGE_RATING
 * @property {LGI.Guide~Field} CAST
 * @property {LGI.Guide~Field} DIRECTORS
 * @property {LGI.Guide~Field} WRITERS
 * @property {LGI.Guide~Field} IMAGE_LINK
 * @property {LGI.Guide~Field} OPENGRAPH_LINK
 * @property {LGI.Guide~Field} RECORD_LINK
 */
var Video = new Resource('video', 'videos');

Video.CRID = new Field(Video, 'crid');
Video.TITLE = new FuzzyMatchField(Video, 'title');
Video.SHORT_SYNOPSIS = new Field(Video, 'shortSynopsis');
Video.SYNOPSIS = new Field(Video, 'synopsis');
Video.CATEGORY = new FuzzyMatchField(Video, 'category');
Video.SEASON = new NumericField(Video, 'season');
Video.EPISODE = new NumericField(Video, 'episode');
Video.STATISTICS = new Field(Video, 'statistics');
Video.AGE_RATING = new TextField(Video, 'ageRating');
Video.CAST = new Field(Video, 'cast');
Video.DIRECTORS = new Field(Video, 'directors');
Video.WRITERS = new Field(Video, 'writers');
Video.IMAGE_LINK = new Field(Video, 'imageLink');
Video.OPENGRAPH_LINK = new Field(Video, 'opengraphLink');
Video.RECORD_LINK = new Field(Video, 'recordLink');
