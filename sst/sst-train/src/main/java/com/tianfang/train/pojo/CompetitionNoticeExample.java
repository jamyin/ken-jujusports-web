package com.tianfang.train.pojo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CompetitionNoticeExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table sst_competition_notice
     *
     * @mbggenerated Tue Jan 26 17:11:31 CST 2016
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table sst_competition_notice
     *
     * @mbggenerated Tue Jan 26 17:11:31 CST 2016
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table sst_competition_notice
     *
     * @mbggenerated Tue Jan 26 17:11:31 CST 2016
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_competition_notice
     *
     * @mbggenerated Tue Jan 26 17:11:31 CST 2016
     */
    public CompetitionNoticeExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_competition_notice
     *
     * @mbggenerated Tue Jan 26 17:11:31 CST 2016
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_competition_notice
     *
     * @mbggenerated Tue Jan 26 17:11:31 CST 2016
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_competition_notice
     *
     * @mbggenerated Tue Jan 26 17:11:31 CST 2016
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_competition_notice
     *
     * @mbggenerated Tue Jan 26 17:11:31 CST 2016
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_competition_notice
     *
     * @mbggenerated Tue Jan 26 17:11:31 CST 2016
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_competition_notice
     *
     * @mbggenerated Tue Jan 26 17:11:31 CST 2016
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_competition_notice
     *
     * @mbggenerated Tue Jan 26 17:11:31 CST 2016
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_competition_notice
     *
     * @mbggenerated Tue Jan 26 17:11:31 CST 2016
     */
    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_competition_notice
     *
     * @mbggenerated Tue Jan 26 17:11:31 CST 2016
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_competition_notice
     *
     * @mbggenerated Tue Jan 26 17:11:31 CST 2016
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table sst_competition_notice
     *
     * @mbggenerated Tue Jan 26 17:11:31 CST 2016
     */
    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andIdIsNull() {
            addCriterion("id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(String value) {
            addCriterion("id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(String value) {
            addCriterion("id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(String value) {
            addCriterion("id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(String value) {
            addCriterion("id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(String value) {
            addCriterion("id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(String value) {
            addCriterion("id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLike(String value) {
            addCriterion("id like", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotLike(String value) {
            addCriterion("id not like", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<String> values) {
            addCriterion("id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<String> values) {
            addCriterion("id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(String value1, String value2) {
            addCriterion("id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(String value1, String value2) {
            addCriterion("id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andCompIdIsNull() {
            addCriterion("comp_id is null");
            return (Criteria) this;
        }

        public Criteria andCompIdIsNotNull() {
            addCriterion("comp_id is not null");
            return (Criteria) this;
        }

        public Criteria andCompIdEqualTo(String value) {
            addCriterion("comp_id =", value, "compId");
            return (Criteria) this;
        }

        public Criteria andCompIdNotEqualTo(String value) {
            addCriterion("comp_id <>", value, "compId");
            return (Criteria) this;
        }

        public Criteria andCompIdGreaterThan(String value) {
            addCriterion("comp_id >", value, "compId");
            return (Criteria) this;
        }

        public Criteria andCompIdGreaterThanOrEqualTo(String value) {
            addCriterion("comp_id >=", value, "compId");
            return (Criteria) this;
        }

        public Criteria andCompIdLessThan(String value) {
            addCriterion("comp_id <", value, "compId");
            return (Criteria) this;
        }

        public Criteria andCompIdLessThanOrEqualTo(String value) {
            addCriterion("comp_id <=", value, "compId");
            return (Criteria) this;
        }

        public Criteria andCompIdLike(String value) {
            addCriterion("comp_id like", value, "compId");
            return (Criteria) this;
        }

        public Criteria andCompIdNotLike(String value) {
            addCriterion("comp_id not like", value, "compId");
            return (Criteria) this;
        }

        public Criteria andCompIdIn(List<String> values) {
            addCriterion("comp_id in", values, "compId");
            return (Criteria) this;
        }

        public Criteria andCompIdNotIn(List<String> values) {
            addCriterion("comp_id not in", values, "compId");
            return (Criteria) this;
        }

        public Criteria andCompIdBetween(String value1, String value2) {
            addCriterion("comp_id between", value1, value2, "compId");
            return (Criteria) this;
        }

        public Criteria andCompIdNotBetween(String value1, String value2) {
            addCriterion("comp_id not between", value1, value2, "compId");
            return (Criteria) this;
        }

        public Criteria andTitleIsNull() {
            addCriterion("title is null");
            return (Criteria) this;
        }

        public Criteria andTitleIsNotNull() {
            addCriterion("title is not null");
            return (Criteria) this;
        }

        public Criteria andTitleEqualTo(String value) {
            addCriterion("title =", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleNotEqualTo(String value) {
            addCriterion("title <>", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleGreaterThan(String value) {
            addCriterion("title >", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleGreaterThanOrEqualTo(String value) {
            addCriterion("title >=", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleLessThan(String value) {
            addCriterion("title <", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleLessThanOrEqualTo(String value) {
            addCriterion("title <=", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleLike(String value) {
            addCriterion("title like", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleNotLike(String value) {
            addCriterion("title not like", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleIn(List<String> values) {
            addCriterion("title in", values, "title");
            return (Criteria) this;
        }

        public Criteria andTitleNotIn(List<String> values) {
            addCriterion("title not in", values, "title");
            return (Criteria) this;
        }

        public Criteria andTitleBetween(String value1, String value2) {
            addCriterion("title between", value1, value2, "title");
            return (Criteria) this;
        }

        public Criteria andTitleNotBetween(String value1, String value2) {
            addCriterion("title not between", value1, value2, "title");
            return (Criteria) this;
        }

        public Criteria andSummaryIsNull() {
            addCriterion("summary is null");
            return (Criteria) this;
        }

        public Criteria andSummaryIsNotNull() {
            addCriterion("summary is not null");
            return (Criteria) this;
        }

        public Criteria andSummaryEqualTo(String value) {
            addCriterion("summary =", value, "summary");
            return (Criteria) this;
        }

        public Criteria andSummaryNotEqualTo(String value) {
            addCriterion("summary <>", value, "summary");
            return (Criteria) this;
        }

        public Criteria andSummaryGreaterThan(String value) {
            addCriterion("summary >", value, "summary");
            return (Criteria) this;
        }

        public Criteria andSummaryGreaterThanOrEqualTo(String value) {
            addCriterion("summary >=", value, "summary");
            return (Criteria) this;
        }

        public Criteria andSummaryLessThan(String value) {
            addCriterion("summary <", value, "summary");
            return (Criteria) this;
        }

        public Criteria andSummaryLessThanOrEqualTo(String value) {
            addCriterion("summary <=", value, "summary");
            return (Criteria) this;
        }

        public Criteria andSummaryLike(String value) {
            addCriterion("summary like", value, "summary");
            return (Criteria) this;
        }

        public Criteria andSummaryNotLike(String value) {
            addCriterion("summary not like", value, "summary");
            return (Criteria) this;
        }

        public Criteria andSummaryIn(List<String> values) {
            addCriterion("summary in", values, "summary");
            return (Criteria) this;
        }

        public Criteria andSummaryNotIn(List<String> values) {
            addCriterion("summary not in", values, "summary");
            return (Criteria) this;
        }

        public Criteria andSummaryBetween(String value1, String value2) {
            addCriterion("summary between", value1, value2, "summary");
            return (Criteria) this;
        }

        public Criteria andSummaryNotBetween(String value1, String value2) {
            addCriterion("summary not between", value1, value2, "summary");
            return (Criteria) this;
        }

        public Criteria andContentIsNull() {
            addCriterion("content is null");
            return (Criteria) this;
        }

        public Criteria andContentIsNotNull() {
            addCriterion("content is not null");
            return (Criteria) this;
        }

        public Criteria andContentEqualTo(String value) {
            addCriterion("content =", value, "content");
            return (Criteria) this;
        }

        public Criteria andContentNotEqualTo(String value) {
            addCriterion("content <>", value, "content");
            return (Criteria) this;
        }

        public Criteria andContentGreaterThan(String value) {
            addCriterion("content >", value, "content");
            return (Criteria) this;
        }

        public Criteria andContentGreaterThanOrEqualTo(String value) {
            addCriterion("content >=", value, "content");
            return (Criteria) this;
        }

        public Criteria andContentLessThan(String value) {
            addCriterion("content <", value, "content");
            return (Criteria) this;
        }

        public Criteria andContentLessThanOrEqualTo(String value) {
            addCriterion("content <=", value, "content");
            return (Criteria) this;
        }

        public Criteria andContentLike(String value) {
            addCriterion("content like", value, "content");
            return (Criteria) this;
        }

        public Criteria andContentNotLike(String value) {
            addCriterion("content not like", value, "content");
            return (Criteria) this;
        }

        public Criteria andContentIn(List<String> values) {
            addCriterion("content in", values, "content");
            return (Criteria) this;
        }

        public Criteria andContentNotIn(List<String> values) {
            addCriterion("content not in", values, "content");
            return (Criteria) this;
        }

        public Criteria andContentBetween(String value1, String value2) {
            addCriterion("content between", value1, value2, "content");
            return (Criteria) this;
        }

        public Criteria andContentNotBetween(String value1, String value2) {
            addCriterion("content not between", value1, value2, "content");
            return (Criteria) this;
        }

        public Criteria andCreateAdminIdIsNull() {
            addCriterion("create_admin_id is null");
            return (Criteria) this;
        }

        public Criteria andCreateAdminIdIsNotNull() {
            addCriterion("create_admin_id is not null");
            return (Criteria) this;
        }

        public Criteria andCreateAdminIdEqualTo(String value) {
            addCriterion("create_admin_id =", value, "createAdminId");
            return (Criteria) this;
        }

        public Criteria andCreateAdminIdNotEqualTo(String value) {
            addCriterion("create_admin_id <>", value, "createAdminId");
            return (Criteria) this;
        }

        public Criteria andCreateAdminIdGreaterThan(String value) {
            addCriterion("create_admin_id >", value, "createAdminId");
            return (Criteria) this;
        }

        public Criteria andCreateAdminIdGreaterThanOrEqualTo(String value) {
            addCriterion("create_admin_id >=", value, "createAdminId");
            return (Criteria) this;
        }

        public Criteria andCreateAdminIdLessThan(String value) {
            addCriterion("create_admin_id <", value, "createAdminId");
            return (Criteria) this;
        }

        public Criteria andCreateAdminIdLessThanOrEqualTo(String value) {
            addCriterion("create_admin_id <=", value, "createAdminId");
            return (Criteria) this;
        }

        public Criteria andCreateAdminIdLike(String value) {
            addCriterion("create_admin_id like", value, "createAdminId");
            return (Criteria) this;
        }

        public Criteria andCreateAdminIdNotLike(String value) {
            addCriterion("create_admin_id not like", value, "createAdminId");
            return (Criteria) this;
        }

        public Criteria andCreateAdminIdIn(List<String> values) {
            addCriterion("create_admin_id in", values, "createAdminId");
            return (Criteria) this;
        }

        public Criteria andCreateAdminIdNotIn(List<String> values) {
            addCriterion("create_admin_id not in", values, "createAdminId");
            return (Criteria) this;
        }

        public Criteria andCreateAdminIdBetween(String value1, String value2) {
            addCriterion("create_admin_id between", value1, value2, "createAdminId");
            return (Criteria) this;
        }

        public Criteria andCreateAdminIdNotBetween(String value1, String value2) {
            addCriterion("create_admin_id not between", value1, value2, "createAdminId");
            return (Criteria) this;
        }

        public Criteria andCreateAdminNameIsNull() {
            addCriterion("create_admin_name is null");
            return (Criteria) this;
        }

        public Criteria andCreateAdminNameIsNotNull() {
            addCriterion("create_admin_name is not null");
            return (Criteria) this;
        }

        public Criteria andCreateAdminNameEqualTo(String value) {
            addCriterion("create_admin_name =", value, "createAdminName");
            return (Criteria) this;
        }

        public Criteria andCreateAdminNameNotEqualTo(String value) {
            addCriterion("create_admin_name <>", value, "createAdminName");
            return (Criteria) this;
        }

        public Criteria andCreateAdminNameGreaterThan(String value) {
            addCriterion("create_admin_name >", value, "createAdminName");
            return (Criteria) this;
        }

        public Criteria andCreateAdminNameGreaterThanOrEqualTo(String value) {
            addCriterion("create_admin_name >=", value, "createAdminName");
            return (Criteria) this;
        }

        public Criteria andCreateAdminNameLessThan(String value) {
            addCriterion("create_admin_name <", value, "createAdminName");
            return (Criteria) this;
        }

        public Criteria andCreateAdminNameLessThanOrEqualTo(String value) {
            addCriterion("create_admin_name <=", value, "createAdminName");
            return (Criteria) this;
        }

        public Criteria andCreateAdminNameLike(String value) {
            addCriterion("create_admin_name like", value, "createAdminName");
            return (Criteria) this;
        }

        public Criteria andCreateAdminNameNotLike(String value) {
            addCriterion("create_admin_name not like", value, "createAdminName");
            return (Criteria) this;
        }

        public Criteria andCreateAdminNameIn(List<String> values) {
            addCriterion("create_admin_name in", values, "createAdminName");
            return (Criteria) this;
        }

        public Criteria andCreateAdminNameNotIn(List<String> values) {
            addCriterion("create_admin_name not in", values, "createAdminName");
            return (Criteria) this;
        }

        public Criteria andCreateAdminNameBetween(String value1, String value2) {
            addCriterion("create_admin_name between", value1, value2, "createAdminName");
            return (Criteria) this;
        }

        public Criteria andCreateAdminNameNotBetween(String value1, String value2) {
            addCriterion("create_admin_name not between", value1, value2, "createAdminName");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminIdIsNull() {
            addCriterion("update_admin_id is null");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminIdIsNotNull() {
            addCriterion("update_admin_id is not null");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminIdEqualTo(String value) {
            addCriterion("update_admin_id =", value, "updateAdminId");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminIdNotEqualTo(String value) {
            addCriterion("update_admin_id <>", value, "updateAdminId");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminIdGreaterThan(String value) {
            addCriterion("update_admin_id >", value, "updateAdminId");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminIdGreaterThanOrEqualTo(String value) {
            addCriterion("update_admin_id >=", value, "updateAdminId");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminIdLessThan(String value) {
            addCriterion("update_admin_id <", value, "updateAdminId");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminIdLessThanOrEqualTo(String value) {
            addCriterion("update_admin_id <=", value, "updateAdminId");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminIdLike(String value) {
            addCriterion("update_admin_id like", value, "updateAdminId");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminIdNotLike(String value) {
            addCriterion("update_admin_id not like", value, "updateAdminId");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminIdIn(List<String> values) {
            addCriterion("update_admin_id in", values, "updateAdminId");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminIdNotIn(List<String> values) {
            addCriterion("update_admin_id not in", values, "updateAdminId");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminIdBetween(String value1, String value2) {
            addCriterion("update_admin_id between", value1, value2, "updateAdminId");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminIdNotBetween(String value1, String value2) {
            addCriterion("update_admin_id not between", value1, value2, "updateAdminId");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminNameIsNull() {
            addCriterion("update_admin_name is null");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminNameIsNotNull() {
            addCriterion("update_admin_name is not null");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminNameEqualTo(String value) {
            addCriterion("update_admin_name =", value, "updateAdminName");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminNameNotEqualTo(String value) {
            addCriterion("update_admin_name <>", value, "updateAdminName");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminNameGreaterThan(String value) {
            addCriterion("update_admin_name >", value, "updateAdminName");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminNameGreaterThanOrEqualTo(String value) {
            addCriterion("update_admin_name >=", value, "updateAdminName");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminNameLessThan(String value) {
            addCriterion("update_admin_name <", value, "updateAdminName");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminNameLessThanOrEqualTo(String value) {
            addCriterion("update_admin_name <=", value, "updateAdminName");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminNameLike(String value) {
            addCriterion("update_admin_name like", value, "updateAdminName");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminNameNotLike(String value) {
            addCriterion("update_admin_name not like", value, "updateAdminName");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminNameIn(List<String> values) {
            addCriterion("update_admin_name in", values, "updateAdminName");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminNameNotIn(List<String> values) {
            addCriterion("update_admin_name not in", values, "updateAdminName");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminNameBetween(String value1, String value2) {
            addCriterion("update_admin_name between", value1, value2, "updateAdminName");
            return (Criteria) this;
        }

        public Criteria andUpdateAdminNameNotBetween(String value1, String value2) {
            addCriterion("update_admin_name not between", value1, value2, "updateAdminName");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNull() {
            addCriterion("create_time is null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNotNull() {
            addCriterion("create_time is not null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeEqualTo(Date value) {
            addCriterion("create_time =", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotEqualTo(Date value) {
            addCriterion("create_time <>", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThan(Date value) {
            addCriterion("create_time >", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("create_time >=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThan(Date value) {
            addCriterion("create_time <", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThanOrEqualTo(Date value) {
            addCriterion("create_time <=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIn(List<Date> values) {
            addCriterion("create_time in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotIn(List<Date> values) {
            addCriterion("create_time not in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeBetween(Date value1, Date value2) {
            addCriterion("create_time between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotBetween(Date value1, Date value2) {
            addCriterion("create_time not between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andLastUpdateTimeIsNull() {
            addCriterion("last_update_time is null");
            return (Criteria) this;
        }

        public Criteria andLastUpdateTimeIsNotNull() {
            addCriterion("last_update_time is not null");
            return (Criteria) this;
        }

        public Criteria andLastUpdateTimeEqualTo(Date value) {
            addCriterion("last_update_time =", value, "lastUpdateTime");
            return (Criteria) this;
        }

        public Criteria andLastUpdateTimeNotEqualTo(Date value) {
            addCriterion("last_update_time <>", value, "lastUpdateTime");
            return (Criteria) this;
        }

        public Criteria andLastUpdateTimeGreaterThan(Date value) {
            addCriterion("last_update_time >", value, "lastUpdateTime");
            return (Criteria) this;
        }

        public Criteria andLastUpdateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("last_update_time >=", value, "lastUpdateTime");
            return (Criteria) this;
        }

        public Criteria andLastUpdateTimeLessThan(Date value) {
            addCriterion("last_update_time <", value, "lastUpdateTime");
            return (Criteria) this;
        }

        public Criteria andLastUpdateTimeLessThanOrEqualTo(Date value) {
            addCriterion("last_update_time <=", value, "lastUpdateTime");
            return (Criteria) this;
        }

        public Criteria andLastUpdateTimeIn(List<Date> values) {
            addCriterion("last_update_time in", values, "lastUpdateTime");
            return (Criteria) this;
        }

        public Criteria andLastUpdateTimeNotIn(List<Date> values) {
            addCriterion("last_update_time not in", values, "lastUpdateTime");
            return (Criteria) this;
        }

        public Criteria andLastUpdateTimeBetween(Date value1, Date value2) {
            addCriterion("last_update_time between", value1, value2, "lastUpdateTime");
            return (Criteria) this;
        }

        public Criteria andLastUpdateTimeNotBetween(Date value1, Date value2) {
            addCriterion("last_update_time not between", value1, value2, "lastUpdateTime");
            return (Criteria) this;
        }

        public Criteria andStatIsNull() {
            addCriterion("stat is null");
            return (Criteria) this;
        }

        public Criteria andStatIsNotNull() {
            addCriterion("stat is not null");
            return (Criteria) this;
        }

        public Criteria andStatEqualTo(Integer value) {
            addCriterion("stat =", value, "stat");
            return (Criteria) this;
        }

        public Criteria andStatNotEqualTo(Integer value) {
            addCriterion("stat <>", value, "stat");
            return (Criteria) this;
        }

        public Criteria andStatGreaterThan(Integer value) {
            addCriterion("stat >", value, "stat");
            return (Criteria) this;
        }

        public Criteria andStatGreaterThanOrEqualTo(Integer value) {
            addCriterion("stat >=", value, "stat");
            return (Criteria) this;
        }

        public Criteria andStatLessThan(Integer value) {
            addCriterion("stat <", value, "stat");
            return (Criteria) this;
        }

        public Criteria andStatLessThanOrEqualTo(Integer value) {
            addCriterion("stat <=", value, "stat");
            return (Criteria) this;
        }

        public Criteria andStatIn(List<Integer> values) {
            addCriterion("stat in", values, "stat");
            return (Criteria) this;
        }

        public Criteria andStatNotIn(List<Integer> values) {
            addCriterion("stat not in", values, "stat");
            return (Criteria) this;
        }

        public Criteria andStatBetween(Integer value1, Integer value2) {
            addCriterion("stat between", value1, value2, "stat");
            return (Criteria) this;
        }

        public Criteria andStatNotBetween(Integer value1, Integer value2) {
            addCriterion("stat not between", value1, value2, "stat");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table sst_competition_notice
     *
     * @mbggenerated do_not_delete_during_merge Tue Jan 26 17:11:31 CST 2016
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table sst_competition_notice
     *
     * @mbggenerated Tue Jan 26 17:11:31 CST 2016
     */
    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}