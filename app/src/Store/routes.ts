
export const server = process.env.NODE_ENV === 'production'
   // eslint-disable-next-line no-restricted-globals
   ? location.origin
   : 'http://127.0.0.1:5000';
export const upload = server + '/upload';
export const histogram = server + '/histogram';
export const filters = server + '/filters';
export const processor = server + '/processor';
export const imageSize = server + '/image-size';


const routes = {
   server,
   filters,
   upload,
   processor,
   histogram,
   imageSize
}
export default routes;