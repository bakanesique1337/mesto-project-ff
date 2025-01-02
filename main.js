(()=>{"use strict";function e(e,t,n,r,o,c,a,i,u,l,s){var p=n.querySelector(".card").cloneNode(!0);p.querySelector(".card__title").textContent=e.name;var d=p.querySelector(".card__image"),_=p.querySelector(".card__likes-count"),f=p.querySelector(".card__delete-button"),y=p.querySelector(".card__like-button"),m=e.name,v=e._id,h=e.link,b=e.likes,S=e.owner;return d.src=h,d.alt=m,_.textContent=b.length,d.addEventListener("click",(function(){s(h,m)})),S._id!==t&&(f.style.visibility="hidden"),f.addEventListener("click",(function(){c(i),i.querySelector(".popup__button").addEventListener("click",(function(){r(p,o,v),a(i)}))})),y.addEventListener("click",(function(){u(y,e,_,l)})),b.some((function(e){return e._id===t}))&&y.classList.add("card__like-button_is-active"),p}function t(e,t,n){t(n).then((function(){e.remove()})).catch((function(e){console.log("Возникла ошибка при удалении карточки:",e)}))}function n(e,t,n,r){var o=e.classList.contains("card__like-button_is-active");console.log("isLiked:",o),console.log("likesCountElement:",n),r(t._id,o).then((function(t){e.classList.toggle("card__like-button_is-active"),n.textContent=t.likes.length})).catch((function(e){return console.log("Возникла ошибка при установке лайка на сервере: ".concat(e))}))}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function o(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}function c(e){e&&(e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o))}function a(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add("popup__input_type_error"),r.textContent=n,r.classList.add("popup__error_visible")}function i(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("popup__input_type_error"),n.classList.remove("popup__error_visible"),n.textContent=""}var u=function(e){return e.some((function(e){return!e.validity.valid}))};function l(e,t){u(e)?(t.disabled=!0,t.classList.add("popup__button_disabled")):(t.disabled=!1,t.classList.remove("popup__button_disabled"))}function s(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(t){i(e,t)})),l(n,r)}var p={baseUrl:"https://nomoreparties.co/v1/cohort-mag-4",headers:{authorization:"1d7e0b7c-fcbb-43a8-a6f9-25005dd0edde","Content-Type":"application/json"}},d=function(e){return e.ok?e.json():Promise.reject("Произошла ошибка в promise: ".concat(e.status))},_=function(e){return fetch("".concat(p.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:p.headers}).then(d)},f=function(e,t){return fetch("".concat(p.baseUrl,"/cards/likes/").concat(e),{method:t?"DELETE":"PUT",headers:p.headers}).then(d)};function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var m,v=document.querySelector(".places__list"),h=document.querySelector("#card-template").content,b=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),g=document.querySelector(".profile__image"),q=document.querySelector(".profile__add-button"),k=document.querySelector(".profile__edit-button"),E=Array.from(document.querySelectorAll(".popup")),L=document.querySelector(".popup_type_new-card"),A=document.querySelector(".popup_type_edit"),C=document.querySelector(".popup_type_edit-avatar"),x=C.querySelector(".popup__form"),w=x.querySelector(".popup__input_type_avatar-url"),T=A.querySelector(".popup__form"),U=T.querySelector(".popup__input_type_name"),j=T.querySelector(".popup__input_type_description"),O=L.querySelector(".popup__form"),P=O.querySelector(".popup__input_type_card-name"),D=O.querySelector(".popup__input_type_url"),I=document.querySelector(".popup_type_image"),B=I.querySelector(".popup__image"),M=I.querySelector(".popup__caption"),N=document.querySelector(".popup_type_delete_card"),J={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};Promise.all([fetch("".concat(p.baseUrl,"/users/me"),{method:"GET",headers:p.headers}).then(d),fetch("".concat(p.baseUrl,"/cards"),{headers:p.headers}).then(d)]).then((function(o){var a,i,u=(i=2,function(e){if(Array.isArray(e))return e}(a=o)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(a,i)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}(a,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),l=u[0],s=u[1],p=l.name,d=l.about,q=l.avatar,k=l._id;H(p,d,q,b,S,g),m=k,Array.from(s).forEach((function(o){var a=e(o,m,h,t,_,r,c,N,n,f,G);v.append(a)}))})).catch((function(e){console.log("Произошла ошибка при загрузке информации пользователя и листа карточек: ".concat(e))}));var H=function(e,t,n,r,o,c){r.textContent=e,o.textContent=t,c.style.backgroundImage="url(".concat(n,")")},z=function(e,t){e.querySelector(".popup__button").textContent=t?"Сохранение...":"Сохранить"};function G(e,t){B.src=e,B.alt=t,M.textContent=t,r(I)}q.addEventListener("click",(function(){r(L)})),k.addEventListener("click",(function(){var e,t,n;s(T,J),e=j,t=b,n=S,U.value=t.textContent,e.value=n.textContent,r(A)})),g.addEventListener("click",(function(){s(x,J),r(C)})),O.addEventListener("submit",(function(o){(function(o){var a;o.preventDefault(),z(O,!0),(a={name:P.value,link:D.value,likes:0,owner:m},fetch("".concat(p.baseUrl,"/cards"),{method:"POST",headers:p.headers,body:JSON.stringify(a)}).then(d)).then((function(o){var a=o.likes,i=e({name:o.name,link:o.link,likes:a,owner:o.owner},m,h,t,_,r,c,N,n,f,G);v.prepend(i),O.reset()})).catch((function(e){console.log("Ошибка при добавлении карточки: ".concat(e))})).finally((function(){z(O,!1)})),c(L)})(o),c(L),s(O,J)})),T.addEventListener("submit",(function(e){(function(e){var t;e.preventDefault(),z(T,!0),(t={name:U.value,about:j.value},fetch("".concat(p.baseUrl,"/users/me"),{method:"PATCH",headers:p.headers,body:JSON.stringify(t)}).then(d)).then((function(e){var t=e.name,n=e.about,r=e.avatar;H(t,n,r,b,S,g)})).catch((function(e){console.log("Произошла ошибка при редактировании информации пользователя: ".concat(e))})).finally((function(){z(T,!1)}))})(e),c(A)})),x.addEventListener("submit",(function(e){(function(e){var t;e.preventDefault(),z(x,!0),(t={avatar:w.value},fetch("".concat(p.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:p.headers,body:JSON.stringify(t)}).then(d)).then((function(e){g.style.backgroundImage="url(".concat(e.avatar,")"),x.reset()})).catch((function(e){console.log("Произошла ошибка при обновлении аватара: ".concat(e))})).finally((function(){z(x,!1)})),c(C)})(e),c(A)})),E.forEach((function(e){e.querySelector(".popup__close").addEventListener("click",(function(){return c(e)})),e.addEventListener("mousedown",(function(t){t.target===t.currentTarget&&c(e)})),e.classList.add("popup_is-animated")})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);l(n,r),n.forEach((function(t){t.addEventListener("input",(function(){!function(e,t){var n=t.getAttribute("name");t.validity.valid?i(e,t):(t.validity.valueMissing&&a(e,t,"Вы пропустили это поле"),t.validity.tooShort&&a(e,t,"Минимальное количество символов: ".concat(t.getAttribute("minlength"),". Длина текста сейчас: ").concat(t.value.length)),t.validity.tooLong&&a(e,t,"Максимальное количество символов: ".concat(t.getAttribute("maxlength"),". Длина текста сейчас: ").concat(t.value.length)),"link"===n&&t.validity.patternMismatch&&a(e,t,"Допустимы только валидные ссылки"),"link"!==n&&t.validity.patternMismatch&&a(e,t,t.getAttribute("data-error")))}(e,t),l(n,r)}))}))}(t,e)}))}(J)})();