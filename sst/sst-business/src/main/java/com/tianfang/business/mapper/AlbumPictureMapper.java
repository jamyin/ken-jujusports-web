package com.tianfang.business.mapper;

import com.tianfang.business.pojo.AlbumPicture;
import com.tianfang.business.pojo.AlbumPictureExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface AlbumPictureMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_album_picture
     *
     * @mbggenerated Mon Feb 29 10:36:37 CST 2016
     */
    int countByExample(AlbumPictureExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_album_picture
     *
     * @mbggenerated Mon Feb 29 10:36:37 CST 2016
     */
    int deleteByExample(AlbumPictureExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_album_picture
     *
     * @mbggenerated Mon Feb 29 10:36:37 CST 2016
     */
    int deleteByPrimaryKey(String id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_album_picture
     *
     * @mbggenerated Mon Feb 29 10:36:37 CST 2016
     */
    int insert(AlbumPicture record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_album_picture
     *
     * @mbggenerated Mon Feb 29 10:36:37 CST 2016
     */
    int insertSelective(AlbumPicture record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_album_picture
     *
     * @mbggenerated Mon Feb 29 10:36:37 CST 2016
     */
    List<AlbumPicture> selectByExample(AlbumPictureExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_album_picture
     *
     * @mbggenerated Mon Feb 29 10:36:37 CST 2016
     */
    AlbumPicture selectByPrimaryKey(String id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_album_picture
     *
     * @mbggenerated Mon Feb 29 10:36:37 CST 2016
     */
    int updateByExampleSelective(@Param("record") AlbumPicture record, @Param("example") AlbumPictureExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_album_picture
     *
     * @mbggenerated Mon Feb 29 10:36:37 CST 2016
     */
    int updateByExample(@Param("record") AlbumPicture record, @Param("example") AlbumPictureExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_album_picture
     *
     * @mbggenerated Mon Feb 29 10:36:37 CST 2016
     */
    int updateByPrimaryKeySelective(AlbumPicture record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sst_album_picture
     *
     * @mbggenerated Mon Feb 29 10:36:37 CST 2016
     */
    int updateByPrimaryKey(AlbumPicture record);
}