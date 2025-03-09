/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@gradio/client/dist/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@gradio/client/dist/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   api_factory: () => (/* binding */ api_factory),\n/* harmony export */   client: () => (/* binding */ client),\n/* harmony export */   duplicate: () => (/* binding */ duplicate),\n/* harmony export */   post_data: () => (/* binding */ post_data),\n/* harmony export */   upload_files: () => (/* binding */ upload_files)\n/* harmony export */ });\nvar fn = new Intl.Collator(0, { numeric: 1 }).compare;\nfunction semiver(a, b, bool) {\n  a = a.split(\".\");\n  b = b.split(\".\");\n  return fn(a[0], b[0]) || fn(a[1], b[1]) || (b[2] = b.slice(2).join(\".\"), bool = /[.-]/.test(a[2] = a.slice(2).join(\".\")), bool == /[.-]/.test(b[2]) ? fn(a[2], b[2]) : bool ? -1 : 1);\n}\nfunction resolve_root(base_url, root_path, prioritize_base) {\n  if (root_path.startsWith(\"http://\") || root_path.startsWith(\"https://\")) {\n    return prioritize_base ? base_url : root_path;\n  }\n  return base_url + root_path;\n}\nfunction determine_protocol(endpoint) {\n  if (endpoint.startsWith(\"http\")) {\n    const { protocol, host } = new URL(endpoint);\n    if (host.endsWith(\"hf.space\")) {\n      return {\n        ws_protocol: \"wss\",\n        host,\n        http_protocol: protocol\n      };\n    }\n    return {\n      ws_protocol: protocol === \"https:\" ? \"wss\" : \"ws\",\n      http_protocol: protocol,\n      host\n    };\n  }\n  return {\n    ws_protocol: \"wss\",\n    http_protocol: \"https:\",\n    host: endpoint\n  };\n}\nconst RE_SPACE_NAME = /^[^\\/]*\\/[^\\/]*$/;\nconst RE_SPACE_DOMAIN = /.*hf\\.space\\/{0,1}$/;\nasync function process_endpoint(app_reference, token) {\n  const headers = {};\n  if (token) {\n    headers.Authorization = `Bearer ${token}`;\n  }\n  const _app_reference = app_reference.trim();\n  if (RE_SPACE_NAME.test(_app_reference)) {\n    try {\n      const res = await fetch(\n        `https://huggingface.co/api/spaces/${_app_reference}/host`,\n        { headers }\n      );\n      if (res.status !== 200)\n        throw new Error(\"Space metadata could not be loaded.\");\n      const _host = (await res.json()).host;\n      return {\n        space_id: app_reference,\n        ...determine_protocol(_host)\n      };\n    } catch (e) {\n      throw new Error(\"Space metadata could not be loaded.\" + e.message);\n    }\n  }\n  if (RE_SPACE_DOMAIN.test(_app_reference)) {\n    const { ws_protocol, http_protocol, host } = determine_protocol(_app_reference);\n    return {\n      space_id: host.replace(\".hf.space\", \"\"),\n      ws_protocol,\n      http_protocol,\n      host\n    };\n  }\n  return {\n    space_id: false,\n    ...determine_protocol(_app_reference)\n  };\n}\nfunction map_names_to_ids(fns) {\n  let apis = {};\n  fns.forEach(({ api_name }, i) => {\n    if (api_name)\n      apis[api_name] = i;\n  });\n  return apis;\n}\nconst RE_DISABLED_DISCUSSION = /^(?=[^]*\\b[dD]iscussions{0,1}\\b)(?=[^]*\\b[dD]isabled\\b)[^]*$/;\nasync function discussions_enabled(space_id) {\n  try {\n    const r = await fetch(\n      `https://huggingface.co/api/spaces/${space_id}/discussions`,\n      {\n        method: \"HEAD\"\n      }\n    );\n    const error = r.headers.get(\"x-error-message\");\n    if (error && RE_DISABLED_DISCUSSION.test(error))\n      return false;\n    return true;\n  } catch (e) {\n    return false;\n  }\n}\nasync function get_space_hardware(space_id, token) {\n  const headers = {};\n  if (token) {\n    headers.Authorization = `Bearer ${token}`;\n  }\n  try {\n    const res = await fetch(\n      `https://huggingface.co/api/spaces/${space_id}/runtime`,\n      { headers }\n    );\n    if (res.status !== 200)\n      throw new Error(\"Space hardware could not be obtained.\");\n    const { hardware } = await res.json();\n    return hardware;\n  } catch (e) {\n    throw new Error(e.message);\n  }\n}\nasync function set_space_hardware(space_id, new_hardware, token) {\n  const headers = {};\n  if (token) {\n    headers.Authorization = `Bearer ${token}`;\n  }\n  try {\n    const res = await fetch(\n      `https://huggingface.co/api/spaces/${space_id}/hardware`,\n      { headers, body: JSON.stringify(new_hardware) }\n    );\n    if (res.status !== 200)\n      throw new Error(\n        \"Space hardware could not be set. Please ensure the space hardware provided is valid and that a Hugging Face token is passed in.\"\n      );\n    const { hardware } = await res.json();\n    return hardware;\n  } catch (e) {\n    throw new Error(e.message);\n  }\n}\nasync function set_space_timeout(space_id, timeout, token) {\n  const headers = {};\n  if (token) {\n    headers.Authorization = `Bearer ${token}`;\n  }\n  try {\n    const res = await fetch(\n      `https://huggingface.co/api/spaces/${space_id}/hardware`,\n      { headers, body: JSON.stringify({ seconds: timeout }) }\n    );\n    if (res.status !== 200)\n      throw new Error(\n        \"Space hardware could not be set. Please ensure the space hardware provided is valid and that a Hugging Face token is passed in.\"\n      );\n    const { hardware } = await res.json();\n    return hardware;\n  } catch (e) {\n    throw new Error(e.message);\n  }\n}\nconst hardware_types = [\n  \"cpu-basic\",\n  \"cpu-upgrade\",\n  \"t4-small\",\n  \"t4-medium\",\n  \"a10g-small\",\n  \"a10g-large\",\n  \"a100-large\"\n];\nconst QUEUE_FULL_MSG = \"This application is too busy. Keep trying!\";\nconst BROKEN_CONNECTION_MSG = \"Connection errored out.\";\nlet NodeBlob;\nasync function duplicate(app_reference, options) {\n  const { hf_token, private: _private, hardware, timeout } = options;\n  if (hardware && !hardware_types.includes(hardware)) {\n    throw new Error(\n      `Invalid hardware type provided. Valid types are: ${hardware_types.map((v) => `\"${v}\"`).join(\",\")}.`\n    );\n  }\n  const headers = {\n    Authorization: `Bearer ${hf_token}`\n  };\n  const user = (await (await fetch(`https://huggingface.co/api/whoami-v2`, {\n    headers\n  })).json()).name;\n  const space_name = app_reference.split(\"/\")[1];\n  const body = {\n    repository: `${user}/${space_name}`\n  };\n  if (_private) {\n    body.private = true;\n  }\n  try {\n    const response = await fetch(\n      `https://huggingface.co/api/spaces/${app_reference}/duplicate`,\n      {\n        method: \"POST\",\n        headers: { \"Content-Type\": \"application/json\", ...headers },\n        body: JSON.stringify(body)\n      }\n    );\n    if (response.status === 409) {\n      return client(`${user}/${space_name}`, options);\n    }\n    const duplicated_space = await response.json();\n    let original_hardware;\n    if (!hardware) {\n      original_hardware = await get_space_hardware(app_reference, hf_token);\n    }\n    const requested_hardware = hardware || original_hardware || \"cpu-basic\";\n    await set_space_hardware(\n      `${user}/${space_name}`,\n      requested_hardware,\n      hf_token\n    );\n    await set_space_timeout(`${user}/${space_name}`, timeout || 300, hf_token);\n    return client(duplicated_space.url, options);\n  } catch (e) {\n    throw new Error(e);\n  }\n}\nfunction api_factory(fetch_implementation, WebSocket_factory) {\n  return { post_data: post_data2, upload_files: upload_files2, client: client2, handle_blob: handle_blob2 };\n  async function post_data2(url, body, token) {\n    const headers = { \"Content-Type\": \"application/json\" };\n    if (token) {\n      headers.Authorization = `Bearer ${token}`;\n    }\n    try {\n      var response = await fetch_implementation(url, {\n        method: \"POST\",\n        body: JSON.stringify(body),\n        headers\n      });\n    } catch (e) {\n      return [{ error: BROKEN_CONNECTION_MSG }, 500];\n    }\n    const output = await response.json();\n    return [output, response.status];\n  }\n  async function upload_files2(root, files, token) {\n    const headers = {};\n    if (token) {\n      headers.Authorization = `Bearer ${token}`;\n    }\n    const chunkSize = 1e3;\n    const uploadResponses = [];\n    for (let i = 0; i < files.length; i += chunkSize) {\n      const chunk = files.slice(i, i + chunkSize);\n      const formData = new FormData();\n      chunk.forEach((file) => {\n        formData.append(\"files\", file);\n      });\n      try {\n        var response = await fetch_implementation(`${root}/upload`, {\n          method: \"POST\",\n          body: formData,\n          headers\n        });\n      } catch (e) {\n        return { error: BROKEN_CONNECTION_MSG };\n      }\n      const output = await response.json();\n      uploadResponses.push(...output);\n    }\n    return { files: uploadResponses };\n  }\n  async function client2(app_reference, options = { normalise_files: true }) {\n    return new Promise(async (res) => {\n      const { status_callback, hf_token, normalise_files } = options;\n      const return_obj = {\n        predict,\n        submit,\n        view_api,\n        component_server\n        // duplicate\n      };\n      const transform_files = normalise_files ?? true;\n      if ((typeof window === \"undefined\" || !(\"WebSocket\" in window)) && !global.Websocket) {\n        const ws = await Promise.all(/*! import() */[__webpack_require__.e(\"vendors-node_modules_gradio_client_dist_wrapper-6f348d45_js\"), __webpack_require__.e(\"_d546-_8131-_3fc0-_cad2-_593c-_4068-_e7e4-_7bec-_0aec-_4f7e-_fbf1-_ed1b-_d17e\")]).then(__webpack_require__.bind(__webpack_require__, /*! ./wrapper-6f348d45.js */ \"./node_modules/@gradio/client/dist/wrapper-6f348d45.js\"));\n        NodeBlob = (await __webpack_require__.e(/*! import() */ \"node_buffer\").then(__webpack_require__.t.bind(__webpack_require__, /*! node:buffer */ \"node:buffer\", 19))).Blob;\n        global.WebSocket = ws.WebSocket;\n      }\n      const { ws_protocol, http_protocol, host, space_id } = await process_endpoint(app_reference, hf_token);\n      const session_hash = Math.random().toString(36).substring(2);\n      const last_status = {};\n      let config;\n      let api_map = {};\n      let jwt = false;\n      if (hf_token && space_id) {\n        jwt = await get_jwt(space_id, hf_token);\n      }\n      async function config_success(_config) {\n        config = _config;\n        api_map = map_names_to_ids((_config == null ? void 0 : _config.dependencies) || []);\n        if (config.auth_required) {\n          return {\n            config,\n            ...return_obj\n          };\n        }\n        try {\n          api = await view_api(config);\n        } catch (e) {\n          console.error(`Could not get api details: ${e.message}`);\n        }\n        return {\n          config,\n          ...return_obj\n        };\n      }\n      let api;\n      async function handle_space_sucess(status) {\n        if (status_callback)\n          status_callback(status);\n        if (status.status === \"running\")\n          try {\n            config = await resolve_config(\n              fetch_implementation,\n              `${http_protocol}//${host}`,\n              hf_token\n            );\n            const _config = await config_success(config);\n            res(_config);\n          } catch (e) {\n            console.error(e);\n            if (status_callback) {\n              status_callback({\n                status: \"error\",\n                message: \"Could not load this space.\",\n                load_status: \"error\",\n                detail: \"NOT_FOUND\"\n              });\n            }\n          }\n      }\n      try {\n        config = await resolve_config(\n          fetch_implementation,\n          `${http_protocol}//${host}`,\n          hf_token\n        );\n        const _config = await config_success(config);\n        res(_config);\n      } catch (e) {\n        console.error(e);\n        if (space_id) {\n          check_space_status(\n            space_id,\n            RE_SPACE_NAME.test(space_id) ? \"space_name\" : \"subdomain\",\n            handle_space_sucess\n          );\n        } else {\n          if (status_callback)\n            status_callback({\n              status: \"error\",\n              message: \"Could not load this space.\",\n              load_status: \"error\",\n              detail: \"NOT_FOUND\"\n            });\n        }\n      }\n      function predict(endpoint, data, event_data) {\n        let data_returned = false;\n        let status_complete = false;\n        let dependency;\n        if (typeof endpoint === \"number\") {\n          dependency = config.dependencies[endpoint];\n        } else {\n          const trimmed_endpoint = endpoint.replace(/^\\//, \"\");\n          dependency = config.dependencies[api_map[trimmed_endpoint]];\n        }\n        if (dependency.types.continuous) {\n          throw new Error(\n            \"Cannot call predict on this function as it may run forever. Use submit instead\"\n          );\n        }\n        return new Promise((res2, rej) => {\n          const app = submit(endpoint, data, event_data);\n          let result;\n          app.on(\"data\", (d) => {\n            if (status_complete) {\n              app.destroy();\n              res2(d);\n            }\n            data_returned = true;\n            result = d;\n          }).on(\"status\", (status) => {\n            if (status.stage === \"error\")\n              rej(status);\n            if (status.stage === \"complete\") {\n              status_complete = true;\n              if (data_returned) {\n                app.destroy();\n                res2(result);\n              }\n            }\n          });\n        });\n      }\n      function submit(endpoint, data, event_data) {\n        let fn_index;\n        let api_info;\n        if (typeof endpoint === \"number\") {\n          fn_index = endpoint;\n          api_info = api.unnamed_endpoints[fn_index];\n        } else {\n          const trimmed_endpoint = endpoint.replace(/^\\//, \"\");\n          fn_index = api_map[trimmed_endpoint];\n          api_info = api.named_endpoints[endpoint.trim()];\n        }\n        if (typeof fn_index !== \"number\") {\n          throw new Error(\n            \"There is no endpoint matching that name of fn_index matching that number.\"\n          );\n        }\n        let websocket;\n        const _endpoint = typeof endpoint === \"number\" ? \"/predict\" : endpoint;\n        let payload;\n        let complete = false;\n        const listener_map = {};\n        let url_params = \"\";\n        if (typeof window !== \"undefined\") {\n          url_params = new URLSearchParams(\n            window.location.search\n          ).toString();\n        }\n        handle_blob2(\n          `${http_protocol}//${resolve_root(host, config.path, true)}`,\n          data,\n          api_info,\n          hf_token\n        ).then((_payload) => {\n          payload = { data: _payload || [], event_data, fn_index };\n          if (skip_queue(fn_index, config)) {\n            fire_event({\n              type: \"status\",\n              endpoint: _endpoint,\n              stage: \"pending\",\n              queue: false,\n              fn_index,\n              time: /* @__PURE__ */ new Date()\n            });\n            post_data2(\n              `${http_protocol}//${resolve_root(host, config.path, true)}/run${_endpoint.startsWith(\"/\") ? _endpoint : `/${_endpoint}`}${url_params ? \"?\" + url_params : \"\"}`,\n              {\n                ...payload,\n                session_hash\n              },\n              hf_token\n            ).then(([output, status_code]) => {\n              const data2 = transform_files ? transform_output(\n                output.data,\n                api_info,\n                config.root,\n                config.root_url\n              ) : output.data;\n              if (status_code == 200) {\n                fire_event({\n                  type: \"data\",\n                  endpoint: _endpoint,\n                  fn_index,\n                  data: data2,\n                  time: /* @__PURE__ */ new Date()\n                });\n                fire_event({\n                  type: \"status\",\n                  endpoint: _endpoint,\n                  fn_index,\n                  stage: \"complete\",\n                  eta: output.average_duration,\n                  queue: false,\n                  time: /* @__PURE__ */ new Date()\n                });\n              } else {\n                fire_event({\n                  type: \"status\",\n                  stage: \"error\",\n                  endpoint: _endpoint,\n                  fn_index,\n                  message: output.error,\n                  queue: false,\n                  time: /* @__PURE__ */ new Date()\n                });\n              }\n            }).catch((e) => {\n              fire_event({\n                type: \"status\",\n                stage: \"error\",\n                message: e.message,\n                endpoint: _endpoint,\n                fn_index,\n                queue: false,\n                time: /* @__PURE__ */ new Date()\n              });\n            });\n          } else {\n            fire_event({\n              type: \"status\",\n              stage: \"pending\",\n              queue: true,\n              endpoint: _endpoint,\n              fn_index,\n              time: /* @__PURE__ */ new Date()\n            });\n            let url = new URL(`${ws_protocol}://${resolve_root(\n              host,\n              config.path,\n              true\n            )}\n\t\t\t\t\t\t\t/queue/join${url_params ? \"?\" + url_params : \"\"}`);\n            if (jwt) {\n              url.searchParams.set(\"__sign\", jwt);\n            }\n            websocket = WebSocket_factory(url);\n            websocket.onclose = (evt) => {\n              if (!evt.wasClean) {\n                fire_event({\n                  type: \"status\",\n                  stage: \"error\",\n                  broken: true,\n                  message: BROKEN_CONNECTION_MSG,\n                  queue: true,\n                  endpoint: _endpoint,\n                  fn_index,\n                  time: /* @__PURE__ */ new Date()\n                });\n              }\n            };\n            websocket.onmessage = function(event) {\n              const _data = JSON.parse(event.data);\n              const { type, status, data: data2 } = handle_message(\n                _data,\n                last_status[fn_index]\n              );\n              if (type === \"update\" && status && !complete) {\n                fire_event({\n                  type: \"status\",\n                  endpoint: _endpoint,\n                  fn_index,\n                  time: /* @__PURE__ */ new Date(),\n                  ...status\n                });\n                if (status.stage === \"error\") {\n                  websocket.close();\n                }\n              } else if (type === \"hash\") {\n                websocket.send(JSON.stringify({ fn_index, session_hash }));\n                return;\n              } else if (type === \"data\") {\n                websocket.send(JSON.stringify({ ...payload, session_hash }));\n              } else if (type === \"complete\") {\n                complete = status;\n              } else if (type === \"log\") {\n                fire_event({\n                  type: \"log\",\n                  log: data2.log,\n                  level: data2.level,\n                  endpoint: _endpoint,\n                  fn_index\n                });\n              } else if (type === \"generating\") {\n                fire_event({\n                  type: \"status\",\n                  time: /* @__PURE__ */ new Date(),\n                  ...status,\n                  stage: status == null ? void 0 : status.stage,\n                  queue: true,\n                  endpoint: _endpoint,\n                  fn_index\n                });\n              }\n              if (data2) {\n                fire_event({\n                  type: \"data\",\n                  time: /* @__PURE__ */ new Date(),\n                  data: transform_files ? transform_output(\n                    data2.data,\n                    api_info,\n                    config.root,\n                    config.root_url\n                  ) : data2.data,\n                  endpoint: _endpoint,\n                  fn_index\n                });\n                if (complete) {\n                  fire_event({\n                    type: \"status\",\n                    time: /* @__PURE__ */ new Date(),\n                    ...complete,\n                    stage: status == null ? void 0 : status.stage,\n                    queue: true,\n                    endpoint: _endpoint,\n                    fn_index\n                  });\n                  websocket.close();\n                }\n              }\n            };\n            if (semiver(config.version || \"2.0.0\", \"3.6\") < 0) {\n              addEventListener(\n                \"open\",\n                () => websocket.send(JSON.stringify({ hash: session_hash }))\n              );\n            }\n          }\n        });\n        function fire_event(event) {\n          const narrowed_listener_map = listener_map;\n          const listeners = narrowed_listener_map[event.type] || [];\n          listeners == null ? void 0 : listeners.forEach((l) => l(event));\n        }\n        function on(eventType, listener) {\n          const narrowed_listener_map = listener_map;\n          const listeners = narrowed_listener_map[eventType] || [];\n          narrowed_listener_map[eventType] = listeners;\n          listeners == null ? void 0 : listeners.push(listener);\n          return { on, off, cancel, destroy };\n        }\n        function off(eventType, listener) {\n          const narrowed_listener_map = listener_map;\n          let listeners = narrowed_listener_map[eventType] || [];\n          listeners = listeners == null ? void 0 : listeners.filter((l) => l !== listener);\n          narrowed_listener_map[eventType] = listeners;\n          return { on, off, cancel, destroy };\n        }\n        async function cancel() {\n          const _status = {\n            stage: \"complete\",\n            queue: false,\n            time: /* @__PURE__ */ new Date()\n          };\n          complete = _status;\n          fire_event({\n            ..._status,\n            type: \"status\",\n            endpoint: _endpoint,\n            fn_index\n          });\n          if (websocket && websocket.readyState === 0) {\n            websocket.addEventListener(\"open\", () => {\n              websocket.close();\n            });\n          } else {\n            websocket.close();\n          }\n          try {\n            await fetch_implementation(\n              `${http_protocol}//${resolve_root(\n                host,\n                config.path,\n                true\n              )}/reset`,\n              {\n                headers: { \"Content-Type\": \"application/json\" },\n                method: \"POST\",\n                body: JSON.stringify({ fn_index, session_hash })\n              }\n            );\n          } catch (e) {\n            console.warn(\n              \"The `/reset` endpoint could not be called. Subsequent endpoint results may be unreliable.\"\n            );\n          }\n        }\n        function destroy() {\n          for (const event_type in listener_map) {\n            listener_map[event_type].forEach((fn2) => {\n              off(event_type, fn2);\n            });\n          }\n        }\n        return {\n          on,\n          off,\n          cancel,\n          destroy\n        };\n      }\n      async function component_server(component_id, fn_name, data) {\n        var _a;\n        const headers = { \"Content-Type\": \"application/json\" };\n        if (hf_token) {\n          headers.Authorization = `Bearer ${hf_token}`;\n        }\n        let root_url;\n        let component = config.components.find(\n          (comp) => comp.id === component_id\n        );\n        if ((_a = component == null ? void 0 : component.props) == null ? void 0 : _a.root_url) {\n          root_url = component.props.root_url;\n        } else {\n          root_url = `${http_protocol}//${resolve_root(\n            host,\n            config.path,\n            true\n          )}/`;\n        }\n        const response = await fetch_implementation(\n          `${root_url}component_server/`,\n          {\n            method: \"POST\",\n            body: JSON.stringify({\n              data,\n              component_id,\n              fn_name,\n              session_hash\n            }),\n            headers\n          }\n        );\n        if (!response.ok) {\n          throw new Error(\n            \"Could not connect to component server: \" + response.statusText\n          );\n        }\n        const output = await response.json();\n        return output;\n      }\n      async function view_api(config2) {\n        if (api)\n          return api;\n        const headers = { \"Content-Type\": \"application/json\" };\n        if (hf_token) {\n          headers.Authorization = `Bearer ${hf_token}`;\n        }\n        let response;\n        if (semiver(config2.version || \"2.0.0\", \"3.30\") < 0) {\n          response = await fetch_implementation(\n            \"https://gradio-space-api-fetcher-v2.hf.space/api\",\n            {\n              method: \"POST\",\n              body: JSON.stringify({\n                serialize: false,\n                config: JSON.stringify(config2)\n              }),\n              headers\n            }\n          );\n        } else {\n          response = await fetch_implementation(`${config2.root}/info`, {\n            headers\n          });\n        }\n        if (!response.ok) {\n          throw new Error(BROKEN_CONNECTION_MSG);\n        }\n        let api_info = await response.json();\n        if (\"api\" in api_info) {\n          api_info = api_info.api;\n        }\n        if (api_info.named_endpoints[\"/predict\"] && !api_info.unnamed_endpoints[\"0\"]) {\n          api_info.unnamed_endpoints[0] = api_info.named_endpoints[\"/predict\"];\n        }\n        const x = transform_api_info(api_info, config2, api_map);\n        return x;\n      }\n    });\n  }\n  async function handle_blob2(endpoint, data, api_info, token) {\n    const blob_refs = await walk_and_store_blobs(\n      data,\n      void 0,\n      [],\n      true,\n      api_info\n    );\n    return Promise.all(\n      blob_refs.map(async ({ path, blob, data: data2, type }) => {\n        if (blob) {\n          const file_url = (await upload_files2(endpoint, [blob], token)).files[0];\n          return { path, file_url, type };\n        }\n        return { path, base64: data2, type };\n      })\n    ).then((r) => {\n      r.forEach(({ path, file_url, base64, type }) => {\n        if (base64) {\n          update_object(data, base64, path);\n        } else if (type === \"Gallery\") {\n          update_object(data, file_url, path);\n        } else if (file_url) {\n          const o = {\n            is_file: true,\n            name: `${file_url}`,\n            data: null\n            // orig_name: \"file.csv\"\n          };\n          update_object(data, o, path);\n        }\n      });\n      return data;\n    });\n  }\n}\nconst { post_data, upload_files, client, handle_blob } = api_factory(\n  fetch,\n  (...args) => new WebSocket(...args)\n);\nfunction transform_output(data, api_info, root_url, remote_url) {\n  return data.map((d, i) => {\n    var _a, _b, _c, _d;\n    if (((_b = (_a = api_info == null ? void 0 : api_info.returns) == null ? void 0 : _a[i]) == null ? void 0 : _b.component) === \"File\") {\n      return normalise_file(d, root_url, remote_url);\n    } else if (((_d = (_c = api_info == null ? void 0 : api_info.returns) == null ? void 0 : _c[i]) == null ? void 0 : _d.component) === \"Gallery\") {\n      return d.map((img) => {\n        return Array.isArray(img) ? [normalise_file(img[0], root_url, remote_url), img[1]] : [normalise_file(img, root_url, remote_url), null];\n      });\n    } else if (typeof d === \"object\" && (d == null ? void 0 : d.is_file)) {\n      return normalise_file(d, root_url, remote_url);\n    }\n    return d;\n  });\n}\nfunction normalise_file(file, root, root_url) {\n  if (file == null)\n    return null;\n  if (typeof file === \"string\") {\n    return {\n      name: \"file_data\",\n      data: file\n    };\n  } else if (Array.isArray(file)) {\n    const normalized_file = [];\n    for (const x of file) {\n      if (x === null) {\n        normalized_file.push(null);\n      } else {\n        normalized_file.push(normalise_file(x, root, root_url));\n      }\n    }\n    return normalized_file;\n  } else if (file.is_file) {\n    if (!root_url) {\n      file.data = root + \"/file=\" + file.name;\n    } else {\n      file.data = \"/proxy=\" + root_url + \"file=\" + file.name;\n    }\n  }\n  return file;\n}\nfunction get_type(type, component, serializer, signature_type) {\n  switch (type.type) {\n    case \"string\":\n      return \"string\";\n    case \"boolean\":\n      return \"boolean\";\n    case \"number\":\n      return \"number\";\n  }\n  if (serializer === \"JSONSerializable\" || serializer === \"StringSerializable\") {\n    return \"any\";\n  } else if (serializer === \"ListStringSerializable\") {\n    return \"string[]\";\n  } else if (component === \"Image\") {\n    return signature_type === \"parameter\" ? \"Blob | File | Buffer\" : \"string\";\n  } else if (serializer === \"FileSerializable\") {\n    if ((type == null ? void 0 : type.type) === \"array\") {\n      return signature_type === \"parameter\" ? \"(Blob | File | Buffer)[]\" : `{ name: string; data: string; size?: number; is_file?: boolean; orig_name?: string}[]`;\n    }\n    return signature_type === \"parameter\" ? \"Blob | File | Buffer\" : `{ name: string; data: string; size?: number; is_file?: boolean; orig_name?: string}`;\n  } else if (serializer === \"GallerySerializable\") {\n    return signature_type === \"parameter\" ? \"[(Blob | File | Buffer), (string | null)][]\" : `[{ name: string; data: string; size?: number; is_file?: boolean; orig_name?: string}, (string | null))][]`;\n  }\n}\nfunction get_description(type, serializer) {\n  if (serializer === \"GallerySerializable\") {\n    return \"array of [file, label] tuples\";\n  } else if (serializer === \"ListStringSerializable\") {\n    return \"array of strings\";\n  } else if (serializer === \"FileSerializable\") {\n    return \"array of files or single file\";\n  }\n  return type.description;\n}\nfunction transform_api_info(api_info, config, api_map) {\n  const new_data = {\n    named_endpoints: {},\n    unnamed_endpoints: {}\n  };\n  for (const key in api_info) {\n    const cat = api_info[key];\n    for (const endpoint in cat) {\n      const dep_index = config.dependencies[endpoint] ? endpoint : api_map[endpoint.replace(\"/\", \"\")];\n      const info = cat[endpoint];\n      new_data[key][endpoint] = {};\n      new_data[key][endpoint].parameters = {};\n      new_data[key][endpoint].returns = {};\n      new_data[key][endpoint].type = config.dependencies[dep_index].types;\n      new_data[key][endpoint].parameters = info.parameters.map(\n        ({ label, component, type, serializer }) => ({\n          label,\n          component,\n          type: get_type(type, component, serializer, \"parameter\"),\n          description: get_description(type, serializer)\n        })\n      );\n      new_data[key][endpoint].returns = info.returns.map(\n        ({ label, component, type, serializer }) => ({\n          label,\n          component,\n          type: get_type(type, component, serializer, \"return\"),\n          description: get_description(type, serializer)\n        })\n      );\n    }\n  }\n  return new_data;\n}\nasync function get_jwt(space, token) {\n  try {\n    const r = await fetch(`https://huggingface.co/api/spaces/${space}/jwt`, {\n      headers: {\n        Authorization: `Bearer ${token}`\n      }\n    });\n    const jwt = (await r.json()).token;\n    return jwt || false;\n  } catch (e) {\n    console.error(e);\n    return false;\n  }\n}\nfunction update_object(object, newValue, stack) {\n  while (stack.length > 1) {\n    object = object[stack.shift()];\n  }\n  object[stack.shift()] = newValue;\n}\nasync function walk_and_store_blobs(param, type = void 0, path = [], root = false, api_info = void 0) {\n  if (Array.isArray(param)) {\n    let blob_refs = [];\n    await Promise.all(\n      param.map(async (v, i) => {\n        var _a;\n        let new_path = path.slice();\n        new_path.push(i);\n        const array_refs = await walk_and_store_blobs(\n          param[i],\n          root ? ((_a = api_info == null ? void 0 : api_info.parameters[i]) == null ? void 0 : _a.component) || void 0 : type,\n          new_path,\n          false,\n          api_info\n        );\n        blob_refs = blob_refs.concat(array_refs);\n      })\n    );\n    return blob_refs;\n  } else if (globalThis.Buffer && param instanceof globalThis.Buffer) {\n    const is_image = type === \"Image\";\n    return [\n      {\n        path,\n        blob: is_image ? false : new NodeBlob([param]),\n        data: is_image ? `${param.toString(\"base64\")}` : false,\n        type\n      }\n    ];\n  } else if (param instanceof Blob || typeof window !== \"undefined\" && param instanceof File) {\n    if (type === \"Image\") {\n      let data;\n      if (typeof window !== \"undefined\") {\n        data = await image_to_data_uri(param);\n      } else {\n        const buffer = await param.arrayBuffer();\n        data = Buffer.from(buffer).toString(\"base64\");\n      }\n      return [{ path, data, type, blob: false }];\n    }\n    return [{ path, blob: param, type, data: false }];\n  } else if (typeof param === \"object\") {\n    let blob_refs = [];\n    for (let key in param) {\n      if (param.hasOwnProperty(key)) {\n        let new_path = path.slice();\n        new_path.push(key);\n        blob_refs = blob_refs.concat(\n          await walk_and_store_blobs(\n            param[key],\n            void 0,\n            new_path,\n            false,\n            api_info\n          )\n        );\n      }\n    }\n    return blob_refs;\n  }\n  return [];\n}\nfunction image_to_data_uri(blob) {\n  return new Promise((resolve, _) => {\n    const reader = new FileReader();\n    reader.onloadend = () => resolve(reader.result);\n    reader.readAsDataURL(blob);\n  });\n}\nfunction skip_queue(id, config) {\n  var _a, _b, _c, _d;\n  return !(((_b = (_a = config == null ? void 0 : config.dependencies) == null ? void 0 : _a[id]) == null ? void 0 : _b.queue) === null ? config.enable_queue : (_d = (_c = config == null ? void 0 : config.dependencies) == null ? void 0 : _c[id]) == null ? void 0 : _d.queue) || false;\n}\nasync function resolve_config(fetch_implementation, endpoint, token) {\n  const headers = {};\n  if (token) {\n    headers.Authorization = `Bearer ${token}`;\n  }\n  if (typeof window !== \"undefined\" && window.gradio_config && location.origin !== \"http://localhost:9876\" && !window.gradio_config.dev_mode) {\n    const path = window.gradio_config.root;\n    const config = window.gradio_config;\n    config.root = resolve_root(endpoint, config.root, false);\n    return { ...config, path };\n  } else if (endpoint) {\n    let response = await fetch_implementation(`${endpoint}/config`, {\n      headers\n    });\n    if (response.status === 200) {\n      const config = await response.json();\n      config.path = config.path ?? \"\";\n      config.root = endpoint;\n      return config;\n    }\n    throw new Error(\"Could not get config.\");\n  }\n  throw new Error(\"No config or app endpoint found\");\n}\nasync function check_space_status(id, type, status_callback) {\n  let endpoint = type === \"subdomain\" ? `https://huggingface.co/api/spaces/by-subdomain/${id}` : `https://huggingface.co/api/spaces/${id}`;\n  let response;\n  let _status;\n  try {\n    response = await fetch(endpoint);\n    _status = response.status;\n    if (_status !== 200) {\n      throw new Error();\n    }\n    response = await response.json();\n  } catch (e) {\n    status_callback({\n      status: \"error\",\n      load_status: \"error\",\n      message: \"Could not get space status\",\n      detail: \"NOT_FOUND\"\n    });\n    return;\n  }\n  if (!response || _status !== 200)\n    return;\n  const {\n    runtime: { stage },\n    id: space_name\n  } = response;\n  switch (stage) {\n    case \"STOPPED\":\n    case \"SLEEPING\":\n      status_callback({\n        status: \"sleeping\",\n        load_status: \"pending\",\n        message: \"Space is asleep. Waking it up...\",\n        detail: stage\n      });\n      setTimeout(() => {\n        check_space_status(id, type, status_callback);\n      }, 1e3);\n      break;\n    case \"PAUSED\":\n      status_callback({\n        status: \"paused\",\n        load_status: \"error\",\n        message: \"This space has been paused by the author. If you would like to try this demo, consider duplicating the space.\",\n        detail: stage,\n        discussions_enabled: await discussions_enabled(space_name)\n      });\n      break;\n    case \"RUNNING\":\n    case \"RUNNING_BUILDING\":\n      status_callback({\n        status: \"running\",\n        load_status: \"complete\",\n        message: \"\",\n        detail: stage\n      });\n      break;\n    case \"BUILDING\":\n      status_callback({\n        status: \"building\",\n        load_status: \"pending\",\n        message: \"Space is building...\",\n        detail: stage\n      });\n      setTimeout(() => {\n        check_space_status(id, type, status_callback);\n      }, 1e3);\n      break;\n    default:\n      status_callback({\n        status: \"space_error\",\n        load_status: \"error\",\n        message: \"This space is experiencing an issue.\",\n        detail: stage,\n        discussions_enabled: await discussions_enabled(space_name)\n      });\n      break;\n  }\n}\nfunction handle_message(data, last_status) {\n  const queue = true;\n  switch (data.msg) {\n    case \"send_data\":\n      return { type: \"data\" };\n    case \"send_hash\":\n      return { type: \"hash\" };\n    case \"queue_full\":\n      return {\n        type: \"update\",\n        status: {\n          queue,\n          message: QUEUE_FULL_MSG,\n          stage: \"error\",\n          code: data.code,\n          success: data.success\n        }\n      };\n    case \"estimation\":\n      return {\n        type: \"update\",\n        status: {\n          queue,\n          stage: last_status || \"pending\",\n          code: data.code,\n          size: data.queue_size,\n          position: data.rank,\n          eta: data.rank_eta,\n          success: data.success\n        }\n      };\n    case \"progress\":\n      return {\n        type: \"update\",\n        status: {\n          queue,\n          stage: \"pending\",\n          code: data.code,\n          progress_data: data.progress_data,\n          success: data.success\n        }\n      };\n    case \"log\":\n      return { type: \"log\", data };\n    case \"process_generating\":\n      return {\n        type: \"generating\",\n        status: {\n          queue,\n          message: !data.success ? data.output.error : null,\n          stage: data.success ? \"generating\" : \"error\",\n          code: data.code,\n          progress_data: data.progress_data,\n          eta: data.average_duration\n        },\n        data: data.success ? data.output : null\n      };\n    case \"process_completed\":\n      if (\"error\" in data.output) {\n        return {\n          type: \"update\",\n          status: {\n            queue,\n            message: data.output.error,\n            stage: \"error\",\n            code: data.code,\n            success: data.success\n          }\n        };\n      }\n      return {\n        type: \"complete\",\n        status: {\n          queue,\n          message: !data.success ? data.output.error : void 0,\n          stage: data.success ? \"complete\" : \"error\",\n          code: data.code,\n          progress_data: data.progress_data,\n          eta: data.output.average_duration\n        },\n        data: data.success ? data.output : null\n      };\n    case \"process_starts\":\n      return {\n        type: \"update\",\n        status: {\n          queue,\n          stage: \"pending\",\n          code: data.code,\n          size: data.rank,\n          position: 0,\n          success: data.success\n        }\n      };\n  }\n  return { type: \"none\", status: { stage: \"error\", queue } };\n}\n\n\n\n//# sourceURL=webpack://webcam-depth-map/./node_modules/@gradio/client/dist/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gradio_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @gradio/client */ \"./node_modules/@gradio/client/dist/index.js\");\n\r\n\r\n// DOM elements\r\nconst startBtn = document.getElementById('startBtn');\r\nconst stopBtn = document.getElementById('stopBtn');\r\nconst captureBtn = document.getElementById('captureBtn');\r\nconst webcamElement = document.getElementById('webcam');\r\nconst depthCanvas = document.getElementById('depthCanvas');\r\nconst errorMessageElement = document.getElementById('errorMessage');\r\nconst captureIntervalSelect = document.getElementById('captureInterval');\r\nconst autoCaptureToggle = document.getElementById('autoCaptureToggle');\r\nconst fpsDisplay = document.getElementById('fpsDisplay');\r\nconst statusIndicator = document.getElementById('statusIndicator');\r\nconst loadingIndicator = document.getElementById('loadingIndicator');\r\nconst apiStats = document.getElementById('apiStats');\r\n\r\n// Variables\r\nlet webcamStream;\r\nlet isRunning = false;\r\nlet depthCtx = depthCanvas.getContext('2d');\r\nlet captureInterval = 3000; // Default: 3 seconds\r\nlet lastCaptureTime = 0;\r\nlet captureTimeoutId = null;\r\nlet frameCount = 0;\r\nlet lastFpsUpdateTime = 0;\r\nlet apiCallCount = 0;\r\nlet gradioClient;\r\nlet isProcessing = false;\r\n\r\n// Initialize the application\r\nasync function init() {\r\n    // Set initial canvas size\r\n    depthCanvas.width = 640;\r\n    depthCanvas.height = 480;\r\n\r\n    // Add event listeners\r\n    startBtn.addEventListener('click', startWebcam);\r\n    stopBtn.addEventListener('click', stopWebcam);\r\n    captureBtn.addEventListener('click', processDepth);\r\n    captureIntervalSelect.addEventListener('change', updateCaptureInterval);\r\n    autoCaptureToggle.addEventListener('change', toggleAutoCapture);\r\n\r\n    // Initial canvas state\r\n    depthCtx.fillStyle = '#f0f0f0';\r\n    depthCtx.fillRect(0, 0, depthCanvas.width, depthCanvas.height);\r\n    depthCtx.fillStyle = '#666';\r\n    depthCtx.font = '20px Arial';\r\n    depthCtx.textAlign = 'center';\r\n    depthCtx.fillText('No depth map generated yet', depthCanvas.width / 2, depthCanvas.height / 2);\r\n\r\n    // Initialize Gradio client\r\n    try {\r\n        updateStatus('Connecting to Depth Anywhere API...');\r\n        gradioClient = await _gradio_client__WEBPACK_IMPORTED_MODULE_0__.client.connect(\"Albert-NHWang/Depth-Anywhere-App\");\r\n        updateStatus('Connected to Depth Anywhere API. Ready to start.');\r\n        captureBtn.disabled = true; // Still disabled until webcam starts\r\n    } catch (error) {\r\n        console.error('Error connecting to Gradio API:', error);\r\n        showError('Failed to connect to the Depth Anywhere API: ' + error.message);\r\n        updateStatus('API Connection Failed');\r\n    }\r\n}\r\n\r\n// Start webcam capture\r\nasync function startWebcam() {\r\n    if (isRunning) return; // Prevent multiple instances\r\n\r\n    try {\r\n        webcamStream = await navigator.mediaDevices.getUserMedia({\r\n            video: {\r\n                width: { ideal: 640 },\r\n                height: { ideal: 480 }\r\n            }\r\n        });\r\n\r\n        webcamElement.srcObject = webcamStream;\r\n        isRunning = true;\r\n\r\n        // Update UI\r\n        startBtn.disabled = true;\r\n        stopBtn.disabled = false;\r\n        captureBtn.disabled = false;\r\n        updateStatus('Webcam running. Ready to process depth.');\r\n\r\n        // Reset counters\r\n        frameCount = 0;\r\n        lastFpsUpdateTime = Date.now();\r\n\r\n        // Start auto-capture if enabled\r\n        if (autoCaptureToggle.checked && captureInterval > 0) {\r\n            startAutoCapture();\r\n        }\r\n\r\n        // Start FPS counter\r\n        requestAnimationFrame(updateFPS);\r\n    } catch (err) {\r\n        console.error('Error accessing webcam:', err);\r\n        showError('Unable to access webcam. Make sure your camera is connected and permissions are granted.');\r\n    }\r\n}\r\n\r\n// Stop webcam capture\r\nfunction stopWebcam() {\r\n    if (webcamStream) {\r\n        webcamStream.getTracks().forEach(track => track.stop());\r\n        webcamElement.srcObject = null;\r\n        isRunning = false;\r\n\r\n        // Update UI\r\n        startBtn.disabled = false;\r\n        stopBtn.disabled = true;\r\n        captureBtn.disabled = true;\r\n        updateStatus('Webcam stopped');\r\n\r\n        // Stop auto-capture\r\n        stopAutoCapture();\r\n\r\n        // Reset captured canvas\r\n        depthCtx.fillStyle = '#f0f0f0';\r\n        depthCtx.fillRect(0, 0, depthCanvas.width, depthCanvas.height);\r\n        depthCtx.fillStyle = '#666';\r\n        depthCtx.font = '20px Arial';\r\n        depthCtx.textAlign = 'center';\r\n        depthCtx.fillText('Webcam stopped', depthCanvas.width / 2, depthCanvas.height / 2);\r\n    }\r\n}\r\n\r\n// Process depth from webcam frame\r\nasync function processDepth() {\r\n    if (!isRunning || !gradioClient || isProcessing) return;\r\n\r\n    isProcessing = true;\r\n    loadingIndicator.style.display = 'block';\r\n\r\n    // Create a temporary canvas to get the image data\r\n    const tempCanvas = document.createElement('canvas');\r\n    tempCanvas.width = webcamElement.videoWidth;\r\n    tempCanvas.height = webcamElement.videoHeight;\r\n    const tempCtx = tempCanvas.getContext('2d');\r\n    tempCtx.drawImage(webcamElement, 0, 0, tempCanvas.width, tempCanvas.height);\r\n\r\n    try {\r\n        updateStatus('Processing depth map...');\r\n\r\n        // Get image as blob\r\n        const imageBlob = await new Promise(resolve => {\r\n            tempCanvas.toBlob(resolve, 'image/png');\r\n        });\r\n\r\n        // Send to Depth Anywhere API\r\n        const startTime = Date.now();\r\n        const result = await gradioClient.predict(\"/depth\", {\r\n            path: imageBlob\r\n        });\r\n        const processingTime = Date.now() - startTime;\r\n\r\n        // Update API call stats\r\n        apiCallCount++;\r\n        apiStats.textContent = `API Calls: ${apiCallCount} | Last processing time: ${processingTime}ms`;\r\n\r\n        // Display result in the canvas\r\n        const depthImage = new Image();\r\n        depthImage.onload = () => {\r\n            depthCtx.clearRect(0, 0, depthCanvas.width, depthCanvas.height);\r\n            depthCtx.drawImage(depthImage, 0, 0, depthCanvas.width, depthCanvas.height);\r\n\r\n            // Add timestamp to the frame\r\n            const timestamp = new Date().toLocaleTimeString();\r\n            depthCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';\r\n            depthCtx.fillRect(0, depthCanvas.height - 30, depthCanvas.width, 30);\r\n            depthCtx.fillStyle = 'white';\r\n            depthCtx.font = '14px Arial';\r\n            depthCtx.textAlign = 'right';\r\n            depthCtx.fillText(`Depth processed: ${timestamp}`, depthCanvas.width - 10, depthCanvas.height - 10);\r\n\r\n            loadingIndicator.style.display = 'none';\r\n            isProcessing = false;\r\n        };\r\n        depthImage.src = result.data;\r\n\r\n        lastCaptureTime = Date.now();\r\n        updateStatus(`Depth map generated successfully (${processingTime}ms)`);\r\n    } catch (error) {\r\n        console.error('Error processing with Depth Anywhere:', error);\r\n        showError('Failed to process depth: ' + error.message);\r\n\r\n        // Show error on canvas\r\n        depthCtx.fillStyle = '#ffebee';\r\n        depthCtx.fillRect(0, 0, depthCanvas.width, depthCanvas.height);\r\n        depthCtx.fillStyle = '#d32f2f';\r\n        depthCtx.font = '16px Arial';\r\n        depthCtx.textAlign = 'center';\r\n        depthCtx.fillText('Error processing depth map', depthCanvas.width / 2, depthCanvas.height / 2 - 10);\r\n        depthCtx.fillText('See console for details', depthCanvas.width / 2, depthCanvas.height / 2 + 20);\r\n\r\n        loadingIndicator.style.display = 'none';\r\n        isProcessing = false;\r\n    }\r\n}\r\n\r\n// Update the capture interval\r\nfunction updateCaptureInterval() {\r\n    captureInterval = parseInt(captureIntervalSelect.value);\r\n    console.log('Updated capture interval:', captureInterval);\r\n\r\n    // Restart auto-capture with new interval\r\n    if (isRunning && autoCaptureToggle.checked) {\r\n        stopAutoCapture();\r\n        if (captureInterval > 0) {\r\n            startAutoCapture();\r\n        }\r\n    }\r\n}\r\n\r\n// Toggle auto-capture\r\nfunction toggleAutoCapture() {\r\n    if (isRunning) {\r\n        if (autoCaptureToggle.checked && captureInterval > 0) {\r\n            startAutoCapture();\r\n        } else {\r\n            stopAutoCapture();\r\n        }\r\n    }\r\n}\r\n\r\n// Start auto-capture\r\nfunction startAutoCapture() {\r\n    if (captureTimeoutId) {\r\n        clearTimeout(captureTimeoutId);\r\n    }\r\n\r\n    function captureLoop() {\r\n        if (!isProcessing) {\r\n            processDepth();\r\n        }\r\n\r\n        captureTimeoutId = setTimeout(captureLoop, captureInterval);\r\n    }\r\n\r\n    captureLoop();\r\n    updateStatus('Auto-processing enabled');\r\n}\r\n\r\n// Stop auto-capture\r\nfunction stopAutoCapture() {\r\n    if (captureTimeoutId) {\r\n        clearTimeout(captureTimeoutId);\r\n        captureTimeoutId = null;\r\n        updateStatus('Auto-processing disabled');\r\n    }\r\n}\r\n\r\n// Update FPS counter\r\nfunction updateFPS() {\r\n    if (!isRunning) return;\r\n\r\n    frameCount++;\r\n    const now = Date.now();\r\n    const elapsed = now - lastFpsUpdateTime;\r\n\r\n    if (elapsed >= 1000) { // Update once per second\r\n        const fps = Math.round((frameCount * 1000) / elapsed);\r\n        fpsDisplay.textContent = `Webcam FPS: ${fps}`;\r\n\r\n        frameCount = 0;\r\n        lastFpsUpdateTime = now;\r\n    }\r\n\r\n    requestAnimationFrame(updateFPS);\r\n}\r\n\r\n// Update the status indicator\r\nfunction updateStatus(status) {\r\n    statusIndicator.textContent = status;\r\n}\r\n\r\n// Display error messages\r\nfunction showError(message) {\r\n    errorMessageElement.textContent = message;\r\n    errorMessageElement.style.display = 'block';\r\n    setTimeout(() => {\r\n        errorMessageElement.style.display = 'none';\r\n    }, 5000);\r\n}\r\n\r\n// Call init() to start the process when the page loads\r\nwindow.onload = init;\n\n//# sourceURL=webpack://webcam-depth-map/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "webcam-depth-map:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwebcam_depth_map"] = self["webpackChunkwebcam_depth_map"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;