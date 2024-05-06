--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.1

-- Started on 2024-05-05 22:06:58 EDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 106501)
-- Name: activities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.activities (
    id integer NOT NULL,
    shift_id integer NOT NULL,
    type smallint NOT NULL,
    "time" timestamp without time zone NOT NULL,
    loc_id integer
);


--
-- TOC entry 221 (class 1259 OID 122880)
-- Name: activities_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.activities ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.activities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 225 (class 1259 OID 188416)
-- Name: location; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.location (
    id integer NOT NULL,
    name character varying NOT NULL,
    zone smallint NOT NULL,
    hub boolean DEFAULT false NOT NULL,
    paper smallint DEFAULT 0 NOT NULL,
    keyboards smallint DEFAULT 0 NOT NULL,
    mice smallint DEFAULT 0 NOT NULL,
    addr character varying NOT NULL
);


--
-- TOC entry 226 (class 1259 OID 188427)
-- Name: printer; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.printer (
    id integer NOT NULL,
    status smallint NOT NULL,
    model character varying NOT NULL,
    kyo_num character varying,
    loc_id integer NOT NULL,
    k_level smallint DEFAULT 0 NOT NULL,
    c_level smallint DEFAULT 0 NOT NULL,
    m_level smallint DEFAULT 0 NOT NULL,
    y_level smallint DEFAULT 0 NOT NULL,
    name character varying NOT NULL
);


--
-- TOC entry 222 (class 1259 OID 139264)
-- Name: reports; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reports (
    id integer NOT NULL,
    type smallint NOT NULL,
    printer_id integer NOT NULL,
    "time" timestamp without time zone NOT NULL,
    handled boolean DEFAULT false NOT NULL,
    "desc" character varying(50)
);


--
-- TOC entry 223 (class 1259 OID 139269)
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.reports ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reports_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 106496)
-- Name: shifts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shifts (
    id integer NOT NULL,
    clock_in timestamp without time zone NOT NULL,
    clock_out timestamp without time zone,
    user_id character varying NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 114688)
-- Name: shifts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.shifts ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.shifts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 24590)
-- Name: task; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.task (
    id integer NOT NULL,
    employee_id character varying NOT NULL,
    type smallint NOT NULL,
    assigned timestamp without time zone NOT NULL,
    completed timestamp without time zone,
    "desc" character varying,
    loc_id integer
);


--
-- TOC entry 227 (class 1259 OID 196620)
-- Name: task_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.task ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.task_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 215 (class 1259 OID 24583)
-- Name: toner; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.toner (
    id integer NOT NULL,
    color smallint NOT NULL,
    type character varying NOT NULL
);


--
-- TOC entry 217 (class 1259 OID 24610)
-- Name: toner_inventory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.toner_inventory (
    loc_id integer NOT NULL,
    toner_id integer NOT NULL,
    quantity smallint NOT NULL
);


--
-- TOC entry 224 (class 1259 OID 163840)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id character varying NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    role smallint NOT NULL,
    email character varying
);


--
-- TOC entry 3233 (class 2606 OID 106505)
-- Name: activities activities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);


--
-- TOC entry 3239 (class 2606 OID 188426)
-- Name: location location2_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location2_pkey PRIMARY KEY (id);


--
-- TOC entry 3241 (class 2606 OID 188437)
-- Name: printer printer2_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.printer
    ADD CONSTRAINT printer2_pkey PRIMARY KEY (id);


--
-- TOC entry 3235 (class 2606 OID 139268)
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- TOC entry 3231 (class 2606 OID 106500)
-- Name: shifts shifts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shifts
    ADD CONSTRAINT shifts_pkey PRIMARY KEY (id);


--
-- TOC entry 3227 (class 2606 OID 24594)
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (id);


--
-- TOC entry 3229 (class 2606 OID 24614)
-- Name: toner_inventory toner_inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.toner_inventory
    ADD CONSTRAINT toner_inventory_pkey PRIMARY KEY (loc_id, toner_id);


--
-- TOC entry 3225 (class 2606 OID 24589)
-- Name: toner toner_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.toner
    ADD CONSTRAINT toner_pkey PRIMARY KEY (id);


--
-- TOC entry 3237 (class 2606 OID 163846)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3247 (class 2606 OID 204805)
-- Name: activities activities_loc_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_loc_id_fkey FOREIGN KEY (loc_id) REFERENCES public.location(id) NOT VALID;


--
-- TOC entry 3248 (class 2606 OID 204800)
-- Name: activities activities_shift_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_shift_id_fkey FOREIGN KEY (shift_id) REFERENCES public.shifts(id) NOT VALID;


--
-- TOC entry 3249 (class 2606 OID 204810)
-- Name: reports reports_printer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_printer_id_fkey FOREIGN KEY (printer_id) REFERENCES public.printer(id) NOT VALID;


--
-- TOC entry 3246 (class 2606 OID 204815)
-- Name: shifts shifts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shifts
    ADD CONSTRAINT shifts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;


--
-- TOC entry 3242 (class 2606 OID 204820)
-- Name: task task_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.users(id) NOT VALID;


--
-- TOC entry 3243 (class 2606 OID 204825)
-- Name: task task_loc_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_loc_id_fkey FOREIGN KEY (loc_id) REFERENCES public.location(id) NOT VALID;


--
-- TOC entry 3244 (class 2606 OID 204830)
-- Name: toner_inventory toner_inventory_loc_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.toner_inventory
    ADD CONSTRAINT toner_inventory_loc_id_fkey FOREIGN KEY (loc_id) REFERENCES public.location(id) NOT VALID;


--
-- TOC entry 3245 (class 2606 OID 204835)
-- Name: toner_inventory toner_inventory_toner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.toner_inventory
    ADD CONSTRAINT toner_inventory_toner_id_fkey FOREIGN KEY (toner_id) REFERENCES public.toner(id) NOT VALID;


-- Completed on 2024-05-05 22:07:03 EDT

--
-- PostgreSQL database dump complete
--


