import {Category} from "./category.entity.js";

/**
 * Tutorial entity within the Publishing bounded context.
 *
 * @class Tutorial
 */
export class Tutorial {


    /**
     * @param {Object} params - Entity attributes.
     * @param {?number} [params.id=null] - Tutorial identifier.
     * @param {string} [params.title=''] - Tutorial title.
     * @param {string} [params.summary=''] - Tutorial abstract shown in listings.
     * @param {?number} [params.categoryId=null] - Foreign key of the related category.
     * @param {?Category} [params.category=null] - Optional category entity reference.
     */
    constructor({ id = null, title = '', summary = '', categoryId = null, category = null }) {
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.categoryId = categoryId;
        this.category = category instanceof Category ? category : null;
    }

}